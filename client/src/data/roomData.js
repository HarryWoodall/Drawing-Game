class RoomData {
  constructor(roomName, roomLeader, roomUsers) {
    this.roomName = roomName;
    this.roomLeader = roomLeader;
    this.roomUsers = roomUsers || [];
    this.scoreData = [];
  }

  // addUser(user) {
  //   if (!this.roomUsers.includes(user)) {
  //     this.roomUsers.push(user);
  //   }
  // }
}

export default RoomData;
