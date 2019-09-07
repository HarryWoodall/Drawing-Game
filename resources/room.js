module.exports = class Sockets {
  constructor(name) {
    this.name = name;
    this.leader = null;
    this.location = "LANDING";
    this.users = [];
    this.activeUsers = [];
    this.bufferedUsers = [];
    this.settings = {
      drawTime: 4,
      countdownTime: 0.5,
      gameCompleteTime: 0.5,
      gamesInRound: 1,
      debuffsActive: true
    };
    this.scoreWeights = [];
    this.noOfRounds = 1;
    this.debuffSelectors = [];
    this.usersChosenForDebuff = [];
  }

  addUser(user) {
    console.log("adding user");
    if (!this.users.includes(user)) {
      this.users.push(user);
      this.activeUsers.push(user);
    }

    if (!this.hasLeader()) {
      this.setNewLeader();
    }

    if (this.leader === null) {
      this.leader = this.getLeader();
    }
  }

  addActiveUser(user) {
    if (
      !this.getActiveUserNames().includes(user.name) &&
      this.getUserNames().includes(user.name)
    ) {
      this.activeUsers.push(user);
    } else {
      console.log("unable to add active user", user);
    }
  }

  addBufferedUser(user) {
    if (
      !this.getBufferedUserNames().includes(user.name) &&
      this.getUserNames().includes(user.name)
    ) {
      this.bufferedUsers.push(user);
    } else {
      console.log("unable to add buffered user", user);
    }
  }

  getUser(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        return this.users[i];
      }
    }
  }

  getUserByName(userName) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == userName) {
        return this.users[i];
      }
    }
  }

  getUserNames() {
    if (this.users.length > 0) {
      let userNames = [];
      for (let user of this.users) {
        userNames.push(user.name);
      }
      return userNames;
    } else {
      console.log("no users found");
    }
  }

  getActiveUserNames() {
    if (this.activeUsers.length > 0) {
      let userNames = [];
      for (let user of this.activeUsers) {
        userNames.push(user.name);
      }
      return userNames;
    } else {
      console.log("no active users found");
    }
  }

  getBufferedUserNames() {
    const userNames = [];
    if (this.bufferedUsers.length > 0) {
      for (let user of this.bufferedUsers) {
        userNames.push(user.name);
      }
    } else {
      console.log("no buffered users found");
    }
    return userNames;
  }

  getUserIds() {
    if (this.users.length > 0) {
      let userIds = [];
      for (let user of this.users) {
        userIds.push(user.id);
      }
      return userIds;
    } else {
      console.log("no users found");
    }
  }

  hasUser(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        return true;
      }
    }
    return false;
  }

  nameTaken(userName) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == userName) {
        return true;
      }
    }
    return false;
  }

  removeActiveUser(userId) {
    for (let i = 0; i < this.activeUsers.length; i++) {
      if (this.activeUsers[i].id === userId) {
        this.activeUsers.splice(i, 1);
        return;
      }
    }
  }

  flushBuffer() {
    console.log("Flushing buffer");

    const bufferedIds = [];
    for (let user of this.bufferedUsers) {
      this.addActiveUser(user);
      bufferedIds.push(user.id);
    }
    this.bufferedUsers = [];
    return bufferedIds;
  }

  removeUser(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        this.users.splice(i, 1);
        return;
      }
    }
  }

  hasLeader() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].isLeader) {
        return true;
      }
    }
    return false;
  }

  getLeader() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].isLeader) {
        return this.users[i].name;
      }
    }
    console.log("no leader found");
  }

  setNewLeader(exclude) {
    console.log("Settings new leader");
    console.log(this.activeUsers);

    for (let user of this.users) {
      user.isLeader = false;
    }

    if (this.activeUsers[0] && exclude) {
      if (this.activeUsers[0].name !== exclude) {
        this.activeUsers[0].isLeader = true;
        this.leader = this.activeUsers[0].name;
      } else if (this.users[1]) {
        this.activeUsers[1].isLeader = true;
        this.leader = this.activeUsers[1].name;
      } else {
        console.log("Last user has left, cannot set new Leader");
      }
    } else if (this.activeUsers[0]) {
      this.activeUsers[0].isLeader = true;
      this.leader = this.activeUsers[0].name;
    }
    console.log("new leader: ", this.leader);
  }

  getLeaderboardData() {
    let leaderboard = [];
    for (let user of this.users) {
      const data = {
        name: user.name,
        score: user.score
      };
      leaderboard.push(data);
    }

    return leaderboard.sort((a, b) => {
      return a.score < b.score;
    });
  }

  hasGivenFeedback() {
    for (let user of this.activeUsers) {
      if (!user.givenFeedback) {
        return false;
      }
    }

    for (let user of this.users) {
      user.givenFeedback = false;
      user.myDrawing = null;
    }
    return true;
  }

  hasSelectedUsersForDebuff() {
    if (this.usersChosenForDebuff.length !== this.debuffSelectors.length) {
      return false;
    }

    this.debuffSelectors = [];
    return true;
  }

  isEmpty() {
    return this.users.length < 1;
  }

  isReady() {
    for (let user of this.activeUsers) {
      if (!user.isReady) {
        return false;
      }
    }

    for (let user of this.users) {
      user.isReady = false;
    }
    return true;
  }

  getReadyUsers() {
    let users = [];
    for (let user of this.users) {
      if (user.isReady) {
        users.push(user.name);
      }
    }
    return users;
  }

  applyDebuff(userName, selector) {
    const mods = [
      "INVISIBLE_INK",
      "OFFSET",
      "MIRROR-H",
      "MIRROR-V",
      "MIRROR-B"
    ];
    const userForDebuff = this.getUserByName(userName);
    const selectorUser = this.getUserByName(selector);

    function addDebuff(min, max) {
      return {
        name: userName,
        debuff: mods[Math.floor(Math.random() * (max + 1 - min)) + min]
      };
    }

    console.log("score difference", userForDebuff.score - selectorUser.score);

    if (userForDebuff.score - selectorUser.score <= 8) {
      this.usersChosenForDebuff.push(addDebuff(0, 1));
    } else if (userForDebuff.score - selectorUser.score > 8) {
      this.usersChosenForDebuff.push(addDebuff(0, 3));
    } else if (userForDebuff.score - selectorUser.score > 16) {
      this.usersChosenForDebuff.push(addDebuff(1, 4));
    } else {
      this.usersChosenForDebuff.push(addDebuff(2, 4));
    }
  }
};
