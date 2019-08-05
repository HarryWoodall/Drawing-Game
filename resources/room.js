module.exports = class Sockets {
  constructor(name) {
    this.name = name;
    this.leader = null;
    this.users = [];
    // this.expectedMembers = 0;
    this.scoreWeights = [];
    this.noOfRounds = 1;
    this.debuffSelectors = [];
    this.usersChosenForDebuff = [];
  }

  addUser(user) {
    console.log("adding user");
    this.users.push(user);

    if (this.leader === null) {
      this.leader = this.getLeader();
    }
    if (!this.hasLeader()) {
      this.setNewLeader();
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

  removeUser(userId) {
    console.log("removing user from room");
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        this.users.splice(i, 1);
        if (!this.hadLeader) {
          this.setNewLeader();
        }
        return;
      }
    }
    console.log("user not found");
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
    if (this.users[0] && exclude) {
      if (this.users[0].name !== exclude) {
        this.users[0].isLeader = true;
        this.leader = this.users[0].name;
      } else if (users[1]) {
        this.users[1].isLeader = true;
        this.leader = this.users[1].name;
      } else {
        console.log("Last user has left, cannot set new Leader");
      }
    } else if (this.users[0]) {
      this.users[0].isLeader = true;
      this.leader = this.users[0].name;
    }
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
    for (let user of this.users) {
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
    for (let user of this.users) {
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
