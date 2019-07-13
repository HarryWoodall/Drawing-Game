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
        console.log("no user found, dissconnecting");
        socket.disconnect();
      } else {
        userList.getUser(userId).socketId = socket.id;

        let roomName = userList.getUser(userId).room;

        socket.join(roomName);
        console.log(
          userList.getUser(userId).name + " Connected to " + roomName
        );

        io.to(roomName).emit("ROOM_UPDATE", {
          users: roomList.getRoom(roomName).getUserNames(),
          leader: roomList.getRoom(roomName).getLeader()
        });

        socket.on("disconnect", data => {
          console.log("user Disconnected");
          let user = userList.getUser(userId);
          let room = roomList.getRoom(roomName);
          if (user) {
            userList.removeUser(userId);
            if (room) {
              room.removeUser(userId);

              if (user.isLeader) {
                if (room.isEmpty()) {
                  roomList.removeRoom(roomName);
                } else {
                  room.setNewLeader();
                }
              }
            }

            io.to(roomName).emit("ROOM_UPDATE", {
              users: room.getUserNames(),
              leader: room.getLeader()
            });
          }
        });

        socket.on("START_GAME_REQ", data => {
          io.in(roomName).emit("GAME_START");
        });

        socket.on("SEND_DRAWING", data => {
          data.ownerId = userId;
          userList.getUser(userId).myDrawing = data;
          console.log("Drawing recieved");
          if (this.checkForDrawings(roomName)) {
            this.distributeDrawings(roomName);
            io.in(roomName).emit(
              "DRAWINGS_READY",
              io.sockets.adapter.rooms[roomName].sockets
            );
            console.log("Drawing ready");
          }
        });

        socket.on("REQUEST_PEER_DRAWING", () => {
          console.log("sending other drawings");

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
          console.log("User score: ", user.score);

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
          console.log("Round count", roundCount);
          const leaderboard = roomList.getRoom(roomName).getLeaderboardData();

          if (roundCount !== null) {
            // Change to for loop
            roomList.getRoom(roomName).debuffSelectors = [
              leaderboard[leaderboard.length - 1].name
            ]; // Type Array
            console.log("Leaderboard", leaderboard);

            io.in(roomName).emit("DEBUFF_SELECTION_ACTIVE", [
              leaderboard[leaderboard.length - 1].name
            ]);
          }
        });

        socket.on("SELECT_USER_FOR_DEBUFF", userName => {
          const user = userList.getUser(userId);
          const room = roomList.getRoom(roomName);

          console.log("Recieved " + user.name + "'s selection");
          console.log(room.debuffSelectors);

          room.usersChosenForDebuff.push(userName);
          user.selectedUserForDebuff = true;

          if (room.hasSelectedUsersForDebuff()) {
            console.log(room.usersChosenForDebuff);

            io.in(roomName).emit("APPLY_DEBUFF", room.usersChosenForDebuff);
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
              io.in(roomName).emit("ROOM_READY_FOR_RESET");
            }
          }
        });

        socket.on("ROOM_SETTINGS_UPDATE", settings => {
          roomList.getRoom(roomName).noOfRounds = settings.gamesInRound;
          io.in(roomName).emit("ROOM_SETTINGS_UPDATE", settings);
        });
      }
    });
  }

  checkForDrawings(roomName) {
    let room = roomList.getRoom(roomName);

    for (let user of room.users) {
      if (!user.myDrawing) {
        return false;
      }
    }
    return true;
  }

  distributeDrawings(roomName) {
    let users = roomList.getRoom(roomName).users;
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

  //debug
  getUsers() {
    let users = [];

    for (let i = 0; i < 3; i++) {
      let user = {
        id: i,
        myDrawing: i + " drawing"
      };
      users.push(user);
    }

    return users;
  }
};
