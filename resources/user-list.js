module.exports = class userList {
  constructor() {
    this.users = [];
    this.inactiveUsers = [];
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

  getUserName(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        return this.users[i].name;
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

  removeUsers(userIds) {
    for (let userId of userIds) {
      this.removeUser(userId);
    }
  }

  addInactiveUser(userId, cookieAge) {
    let data = {
      userId: userId,
      expireDate: new Date(Date.now() + cookieAge)
    };
    this.inactiveUsers.push(data);
  }

  removeInactiveUser(userId) {
    for (let i = 0; i < this.inactiveUsers.length; i++) {
      if (this.inactiveUsers[i].userId === userId) {
        this.inactiveUsers.splice(i, 1);
        return;
      }
    }
    console.log("Unable to remove inactive user", userId);
  }

  removeInactiveUsers(userIds) {
    for (let userId of userIds) {
      for (let i = 0; i < this.inactiveUsers.length; i++) {
        if (this.inactiveUsers[i].userId === userId) {
          this.inactiveUsers.splice(i, 1);
          return;
        }
      }
      console.log("Unable to remove inactive user", userId);
    }
  }

  isInactiveUser(userId) {
    for (let userData of this.inactiveUsers) {
      if (userData.userId === userId) {
        return true;
      }
    }
    return false;
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
