const socketIO = require("socket.io");
const BonusPointTally = require("./bonusPointTally");

let userList;
let roomList;
let io;
let extraPoints = null;

module.exports = class Sockets {
  constructor(server, sess, rooms, users) {
    userList = users;
    roomList = rooms;
    io = socketIO(server);
    io.use(function(socket, next) {
      sess(socket.request, socket.request.res, next);
    });
  }

  startSocket() {
    const test = io.of("/test");
    test.on("connection", socket => {
      console.log("connected to test namespace|");
    });

    io.on("connection", socket => {
      let userId = socket.request.session.id;

      if (!userList.checkUserExists(userId)) {
        // console.log("no user found, dissconnecting");
        socket.disconnect();
      } else {
        userList.getUser(userId).socketId = socket.id;

        let roomName = userList.getUser(userId).room;

        socket.join(roomName);
        console.log(
          userList.getUser(userId).name + " Connected to " + roomName
        );

        if (userList.isInactiveUser(userId)) {
          const room = roomList.getRoom(roomName);

          if (room.location === "LOBBY") {
            userList.removeInactiveUser(userId);
            room.addActiveUser(userList.getUser(userId));
          } else {
            room.addBufferedUser(userList.getUser(userId));
          }

          io.to(roomName).emit("USER_RETURNING", {
            user: userList.getUser(userId).name,
            location: room.location,
            roomName: roomName,
            roomUsers: room.getUserNames(),
            activeUsers: room.getActiveUserNames(),
            leader: room.getLeader()
          });
        }

        io.to(roomName).emit("ROOM_UPDATE", {
          users: roomList.getRoom(roomName).getUserNames(),
          activeUsers: roomList.getRoom(roomName).getActiveUserNames(),
          bufferedUsers: roomList.getRoom(roomName).getBufferedUserNames(),
          leader: roomList.getRoom(roomName).getLeader()
        });

        socket.on("disconnect", data => {
          console.log(userList.getUserName(userId) + " has disconnected");
          let user = userList.getUser(userId);
          let room = roomList.getRoom(roomName);

          if (room) {
            if (room.activeUsers.length > 1) {
              const cookieMaxAge = 600000;
              socket.request.session.cookie.maxAge = cookieMaxAge;
              userList.addInactiveUser(userId, cookieMaxAge);

              if (user && room) {
                room.removeActiveUser(userId);
                if (user.isLeader) {
                  room.setNewLeader(user.name);
                }
              }

              io.to(roomName).emit("ROOM_UPDATE", {
                users: room.getUserNames(),
                activeUsers: room.getActiveUserNames(),
                leader: room.getLeader()
              });
            } else {
              //Drop the room
              console.log("Removing Room");

              if (user && room) {
                userList.removeUsers(room.getUserIds());
                roomList.removeRoom(roomName);
              }
            }
          }
        });

        socket.on("SET_LOCATION", location => {
          roomList.getRoom(roomName).location = location;
        });

        socket.on("START_GAME_REQ", data => {
          io.in(roomName).emit("GAME_START");
        });

        socket.on("SEND_DRAWING", data => {
          data.ownerId = userId;
          userList.getUser(userId).myDrawing = data;
          if (this.checkForDrawings(roomName)) {
            this.distributeDrawings(roomName);
            io.in(roomName).emit(
              "DRAWINGS_READY",
              io.sockets.adapter.rooms[roomName].sockets
            );
          }
        });

        socket.on("REQUEST_PEER_DRAWING", () => {
          let room = roomList.getRoom(roomName);
          let user = room.getUser(userId);
          socket.emit("PEER_DRAWING", user.otherDrawing);
        });

        socket.on("GUESS_SUBMISSION", data => {
          let user = userList.getUser(userId);
          let returnData = {
            owner: user.name,
            guess: data.guess,
            answer: data.answer
          };

          user.givenFeedback = true;

          io.to(userList.getUser(data.ownerId).socketId).emit(
            "RETURN_ANSWER",
            returnData
          );

          if (roomList.getRoom(roomName).hasGivenFeedback()) {
            io.in(roomName).emit("GAME_COMPLETE");
          }
        });

        socket.on("UPDATE_SCORE", data => {
          if (extraPoints === null) {
            extraPoints = new BonusPointTally(
              roomList.getRoom(roomName).noOfRounds
            );
          }
          const user = userList.getUser(userId);
          user.score = data.score;
          if (data.isWeighted) {
            let bonusPointData = {
              name: data.name,
              timeStamp: data.timeStamp
            };
            extraPoints.addData(data.currentGame, bonusPointData);
            if (data.currentGame === 0) {
              user.weightedScore = [];
            }
            const weightData = {
              currentGame: data.currentGame,
              timeStamp: data.timeStamp
            };
            user.weightedScoreData.push(weightData);
          }
        });

        socket.on("READY_FOR_DEBUFFS", roundCount => {
          const leaderboard = roomList.getRoom(roomName).getLeaderboardData();

          if (roundCount !== null) {
            // Change to for loop
            roomList.getRoom(roomName).debuffSelectors = [
              leaderboard[leaderboard.length - 1].name
            ]; // Type Array

            io.in(roomName).emit("DEBUFF_SELECTION_ACTIVE", [
              leaderboard[leaderboard.length - 1].name
            ]);
          }
        });

        socket.on("SELECT_USER_FOR_DEBUFF", userName => {
          const room = roomList.getRoom(roomName);
          if (userName !== null) {
            const user = userList.getUser(userId);
            room.applyDebuff(userName, user.name);
          }

          if (
            room.hasSelectedUsersForDebuff() &&
            room.usersChosenForDebuff.length
          ) {
            io.in(roomName).emit("APPLY_DEBUFF", room.usersChosenForDebuff);
            room.usersChosenForDebuff = [];
          }
        });

        socket.on("GET_ROOM_LEADERBOARD", () => {
          let bonusPointData;
          let roomLeaderboardData;
          if (extraPoints) {
            bonusPointData = extraPoints.calculateExtraPoints();
            roomLeaderboardData = {
              leaderboardData: [],
              bonusPointData: bonusPointData
            };
          } else {
            roomLeaderboardData = {
              leaderboardData: []
            };
          }

          roomLeaderboardData.leaderboardData = roomList
            .getRoom(roomName)
            .getLeaderboardData();

          extraPoints = null;

          io.in(roomName).emit("ROOM_LEADERBOARD", roomLeaderboardData);
        });

        socket.on("USER_READY", isReady => {
          let user = userList.getUser(userId);
          let room = roomList.getRoom(roomName);

          user.isReady = isReady;
          io.in(roomName).emit("READY_CHANGE", room.getReadyUsers());

          if (isReady) {
            if (room.isReady()) {
              userList.removeInactiveUsers(room.flushBuffer());
              io.in(roomName).emit("ROOM_READY_FOR_RESET", {
                users: room.getUserNames(),
                activeUsers: room.getActiveUserNames(),
                leader: room.getLeader()
              });
            }
          }
        });

        socket.on("ROOM_SETTINGS_UPDATE", settings => {
          roomList.getRoom(roomName).noOfRounds = settings.gamesInRound;
          io.in(roomName).emit("ROOM_SETTINGS_UPDATE", settings);
        });

        socket.on("REMOVE_USER", () => {
          const room = roomList.getRoom(roomName);
          const user = userList.getUser(userId);

          room.removeUser(user);
          room.removeActiveUser(user);
          userList.removeUser(userId);

          if (room.isEmpty()) {
            roomList.removeRoom(roomName);
          }
          socket.request.session.destroy(err => {
            // cannot access session here
          });
        });
      }
    });
  }

  checkForDrawings(roomName) {
    let room = roomList.getRoom(roomName);

    for (let user of room.activeUsers) {
      if (!user.myDrawing) {
        return false;
      }
    }
    return true;
  }

  distributeDrawings(roomName) {
    let users = roomList.getRoom(roomName).activeUsers;
    let usersNotSelected = users.slice();
    let arrays = [];

    if (users.length === 1) {
      users[0].otherDrawing = users[0].myDrawing;
      return;
    }

    // Setup arrays
    for (let i = 0; i < users.length; i++) {
      // Setup available users that can be taken from
      let availableUsers = [];
      for (let j = 0; j < users.length; j++) {
        if (j !== i) {
          availableUsers.push(j);
        }
      }
      arrays.push(availableUsers);
    }

    while (usersNotSelected.length > 0) {
      // Check if only 1 choice remains

      for (let i = 0; i < usersNotSelected.length; i++) {
        if (arrays[i].length == 1) {
          let selectedIndex = arrays[i][0];
          usersNotSelected[i].otherDrawing = users[selectedIndex].myDrawing;
          arrays.splice(i, 1);
          usersNotSelected.splice(i, 1);
          if (arrays[0] != undefined) {
            removeSelection(selectedIndex);
          }
        }
      }

      // Else, just pick from the top
      if (arrays.length) {
        let firstArray = arrays[0];
        let selectedUserIndex = firstArray[selectIndex(arrays[0].length)];
        usersNotSelected[0].otherDrawing = users[selectedUserIndex].myDrawing;

        arrays.splice(0, 1);
        usersNotSelected.splice(0, 1);
        removeSelection(selectedUserIndex);
      }
    }

    function removeSelection(selection) {
      for (let i = 0; i < arrays.length; i++) {
        for (let j = 0; j < arrays[i].length; j++) {
          if (arrays[i][j] === selection) {
            // If you have that number if your array, remove it as it is no longer available.
            arrays[i].splice(j, 1);
          }
        }
      }
    }

    function selectIndex(max) {
      return Math.floor(Math.random() * max);
    }
  }

  checkForExpiredUsers() {
    setInterval(() => {
      for (let inactiveUser of userList.inActiveUsers) {
        if (inactiveUser.expireDate <= new Date(Date.now())) {
          const room = roomList.getRoom(roomName);
          const user = userList.getUser(userId);

          room.removeUser(user);
          room.removeActiveUser(user);
          userList.removeUser(userId);

          if (room.isEmpty()) {
            roomList.removeRoom(roomName);
          }
        }
      }
    }, 60000);
  }
};
