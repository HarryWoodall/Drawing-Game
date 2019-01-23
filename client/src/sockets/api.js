import openSocket from "socket.io-client";
const socket = openSocket();

function socketAPI() {
  socket.on("start", function(data) {
    console.log(data);
  });
}
export { socketAPI };
