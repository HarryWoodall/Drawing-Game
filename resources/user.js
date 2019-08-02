module.exports = class User {
  constructor(id, name, room, isLeader) {
    this.id = id;
    this.socketId;
    this.name = name;
    this.room = room;
    this.isLeader = isLeader;
    this.myDrawing;
    this.otherDrawing;
    this.givenFeedback = false;
    this.isReady = false;
    this.score = 0;
    this.weightedScoreData = [];
  }
};
