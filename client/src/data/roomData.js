class RoomData {
  constructor(roomName, roomLeader, roomUsers) {
    this.roomName = roomName;
    this.roomLeader = roomLeader;
    this.roomUsers = roomUsers || [];
    this.scoreData = [];
  }
}

export default RoomData;
