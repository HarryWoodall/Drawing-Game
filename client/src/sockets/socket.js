import io from "socket.io-client";
let socket;

class socketAPI {
  constructor(s) {
    this.socket = null;
    this.currentRound = 0;
    if (s === null) {
      socket = io();
    } else {
      socket = s;
      this.socket = s;
    }
  }

  getSocket() {
    socket.on("start", function(data) {
      console.log(data);
    });

    return socket;
  }

  destroySocket() {
    this.socket = null;
  }

  connect() {
    this.socket.connect();
  }

  lobbyUpdate(onRoomUpdate) {
    this.socket.on("ROOM_UPDATE", onRoomUpdate);
  }

  gameCompletion(onGameCompletion, maxRound) {
    this.socket.on("GAME_COMPLETE", () => {
      if (this.currentRound === maxRound) {
        console.log("Removing listener to GAME_COMPLETE");

        this.socket.off("GAME_COMPLETE");
      }
      this.currentRound++;

      onGameCompletion();
    });
  }

  drawingsReady(onDrawingReady) {
    this.socket.once("DRAWINGS_READY", () => {
      onDrawingReady();
      this.socket.emit("REQUEST_PEER_DRAWING");
    });
  }

  peerDrawing(onPeerDrawing) {
    this.socket.once("PEER_DRAWING", onPeerDrawing);
  }

  returnAnswer(onReturnAnswer) {
    this.socket.once("RETURN_ANSWER", onReturnAnswer);
  }

  requestRoomLeaderboard() {
    this.socket.emit("GET_ROOM_LEADERBOARD");
  }

  roomLeaderboard(onRoomLeaderboard) {
    this.socket.once("ROOM_LEADERBOARD", onRoomLeaderboard);
  }

  readyChange(onReadyChange) {
    this.socket.on("READY_CHANGE", onReadyChange);
  }

  disconnectReadyChange() {
    console.log("disconnecting ready change");
    this.socket.off("READY_CHANGE");
  }

  roomReadyForReset(onRoomReadyForReset) {
    this.socket.on("ROOM_READY_FOR_RESET", onRoomReadyForReset);
  }
}
export default socketAPI;
