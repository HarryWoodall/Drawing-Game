module.exports = class User {
  constructor(id, name, room, isLeader) {
    this.id = id;
    this.name = name;
    this.room = room;
    this.isLeader = isLeader;
    this.myDrawing;
    this.otherDrawing;
  }
};
