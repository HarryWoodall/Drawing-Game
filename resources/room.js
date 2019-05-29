module.exports = class Sockets {
  constructor(name) {
    this.name = name;
    this.leader = null;
    this.users = [];
    this.expectedMembers = 0;
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

  setNewLeader() {
    if (this.users[0]) {
      this.users[0].isLeader = true;
      this.leader = this.users[0].name;
    }
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
};
