const socketIO = require("socket.io");

let userList;
let roomList;
let io;

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
    io.on("connection", socket => {
      let userId = socket.request.session.id;

      if (!userList.checkUserExists(userId)) {
        console.log("no room found, dissconnecting");

        socket.disconnect();
      } else {
        userList.getUser(userId).socketId = socket.id;
        console.log(socket.id, userId);

        let roomName = userList.getUser(userId).room;

        socket.join(roomName);
        console.log(
          userList.getUser(userId).name + " Connected to " + roomName
        );

        io.to(roomName).emit("ADDED_USER_TO_ROOM", {
          user: userList.getUser(userId).name
        });

        socket.on("disconnect", data => {
          console.log("user Disconnected");

          io.to(roomName).emit("REMOVED_USER_FROM_ROOM", {
            user: userList.getUser(userId).name
          });

          userList.removeUser(userId);
          roomList.getRoom(roomName).removeUser(userId);
        });

        socket.on("INIT_LOBBY_REQ", data => {
          console.log("Init lobby request");

          let user = userList.getUser(userId);
          let room = roomList.getRoom(user.room);
          let users = [];

          for (let user of room.users) {
            users.push(user.name);
          }

          let lobbyData = {
            userName: user.name,
            roomName: room.name,
            users: users,
            leader: room.getLeader()
          };

          socket.emit("INIT_LOBBY_DATA", lobbyData);
        });

        socket.on("GET_USER", data => {
          socket.emit("SEND_USER", userList.getUser(userId));
        });

        socket.on("START_GAME_REQ", data => {
          console.log("start game request recieved");

          io.in(roomName).emit("GAME_START");
        });

        socket.on("SEND_DRAWING", data => {
          let user = roomList.getRoom(roomName).getUser(userId);
          data.owner = userId;
          userList.getUser(userId).myDrawing = data;
          if (this.checkForDrawings(roomName)) {
            this.distributeDrawings(roomName);
            io.in(roomName).emit("DRAWINGS_READY");
          }
        });

        socket.on("REQUEST_OTHER_DRAWING", data => {
          console.log("sending other drawings");

          let room = roomList.getRoom(roomName);
          let user = room.getUser(userId);
          socket.emit("OTHER_DRAWING", user.otherDrawing);
        });

        socket.on("GUESS_SUBMISSION", data => {
          let user = userList.getUser(userId);
          let returnData = {
            owner: user.name,
            guess: data.guess,
            answer: data.answer
          };

          user.givenFeedback = true;

          io.to(userList.getUser(data.owner).socketId).emit(
            "RETURN_ANSWER",
            returnData
          );

          if (roomList.getRoom(roomName).hasGivenFeedback()) {
            io.in(roomName).emit("GAME_COMPLETE");
          }
        });

        socket.on("USER_READY", data => {
          userList.getUser(userId).isReady = true;
          if (roomList.getRoom(roomName).isReady()) {
            io.in(roomName).emit("ROOM_READY_FOR_RESET");
          }
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
          if (arrays[i]) {
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
};
