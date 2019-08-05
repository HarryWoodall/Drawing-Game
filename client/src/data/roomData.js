class RoomData {
  constructor(roomName, roomLeader, roomUsers) {
    this.roomName = roomName;
    this.roomLeader = roomLeader;
    this.roomUsers = roomUsers || [];
    this.activeUsers = [];
    this.roomBufferUsers = [];
    this.scoreData = {};
    this.roundCount = 0;
    this.roomSettings = {
      drawTime: 4,
      countdownTime: 3,
      gameCompleteTime: 5
    };
  }
}

export default RoomData;
