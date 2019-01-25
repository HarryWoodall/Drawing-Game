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

        socket.on("SEND_DRAWING", data => {
          console.log(data);
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
            isLeader: user.isLeader
          };

          socket.emit("INIT_LOBBY_DATA", lobbyData);
        });
      }
    });
  }
};
