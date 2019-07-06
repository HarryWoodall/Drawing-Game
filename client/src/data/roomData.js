class RoomData {
  constructor(roomName, roomLeader, roomUsers) {
    this.roomName = roomName;
    this.roomLeader = roomLeader;
    this.roomUsers = roomUsers || [];
    this.scoreData = {};
    this.roomSettings = {
      drawTime: 4,
      countdownTime: 3,
      gameCompleteTime: 5
    };
  }
}

export default RoomData;
