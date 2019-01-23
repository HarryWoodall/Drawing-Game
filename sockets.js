const socketIO = require("socket.io");
let io;

module.exports = class Sockets {
  constructor(server) {
    io = socketIO(server);
    console.log("started socket", io);
  }

  startSocket() {
    io.on("connection", socket => {
      console.log("user Connected");
      socket.emit("start", { Hello: "World" });
    });
  }
};
