module.exports = class userList {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  getUser(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        return this.users[i];
      }
    }
  }

  removeUser(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        this.users.splice(i, 1);
      }
    }
  }

  checkUserExists(id) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        return true;
      }
    }
    return false;
  }
};
