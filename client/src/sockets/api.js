import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

function socketAPI() {
  socket.on("start", function(data) {
    console.log(data);
  });
}
export { socketAPI };
