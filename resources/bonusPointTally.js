module.exports = class BonusPointTally {
  constructor(noOfGames) {
    this.noOfGames = noOfGames;
    this.bonusPoints = {};
    for (let i = 0; i < noOfGames; i++) {
      this.bonusPoints[i] = [];
    }
  }

  addData(gameNo, data) {
    this.bonusPoints[gameNo].push(data);
  }

  calculateExtraPoints() {
    let names = [];
    for (let i = 0; i < this.noOfGames; i++) {
      let currentTime;
      let currentName;
      for (let data of this.bonusPoints[i]) {
        if ((!currentTime && !currentName) || currentTime > data.timeStamp) {
          currentTime = data.timeStamp;
          currentName = data.name;
        }
      }
      if (currentName) {
        names.push(currentName);
      }
    }
    return names;
  }
};
