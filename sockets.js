const socketIO = require("socket.io");
let io;

module.exports = class Sockets {
  constructor(server) {
    io = socketIO();
  }

  startSocket() {
    io.on("connection", socket => {
      console.log("user Connected");
      socket.emit("start", { Hello: "World" });
    });

    const socketPort = 8000;
    io.listen(socketPort);
    console.log("listening on port ", 8000);
  }
};
