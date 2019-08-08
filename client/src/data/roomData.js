class RoomData {
  constructor(roomName, roomLeader, roomUsers, activeUsers) {
    this.roomName = roomName;
    this.roomLeader = roomLeader;
    this.roomUsers = roomUsers || [];
    this.activeUsers = activeUsers || [];
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
