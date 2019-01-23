import io from "socket.io-client";
const socket = io();

function socketAPI() {
  socket.on("start", function(data) {
    console.log(data);
  });
}
export { socketAPI };
