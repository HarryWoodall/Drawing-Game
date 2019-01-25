module.exports = class Sockets {
  constructor(name) {
    this.name = name;
    this.users = [];
    this.expectedMembers = 0;
  }

  addUser(user) {
    console.log("adding user");
    this.users.push(user);
  }

  getUser(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        return this.users[i];
      }
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

  setNewLeader() {
    if (this.users[0]) {
      this.users[0].isLeader = true;
    }
  }
};
