import io from "socket.io-client";
let socket;

class socketAPI {
  constructor(s) {
    if (s === null) {
      socket = io();
    } else {
      socket = s;
    }
  }

  getSocket() {
    socket.on("start", function(data) {
      console.log(data);
    });

    return socket;
  }
}
export default socketAPI;
