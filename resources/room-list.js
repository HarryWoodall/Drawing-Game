const Room = require("./room");

module.exports = class RoomList {
  constructor() {
    this.rooms = [];
    this.testRoom = new Room("TEST_ROOM");
    this.addRoom(this.testRoom);
  }

  getRoom(roomName) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].name == roomName) {
        return this.rooms[i];
      }
    }
  }

  addRoom(room) {
    this.rooms.push(room);
  }

  createRoomName() {
    let name = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    do {
      for (let i = 0; i < 4; i++) {
        name += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    } while (this.checkRoomExists(name));

    return name;
  }

  removeRoom(room) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].name == room.name) {
        this.rooms.splice(i, 1);
      }
    }
  }

  checkRoomExists(roomName) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].name == roomName) {
        return true;
      }
    }
    return false;
  }
};
