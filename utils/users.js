class Users {
  constructor() {
    this.users = [];
    this.bullets = [];
  }
  addUser(id, x, y, bullets) {
    let user = { id, x, y, bullets };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    let user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }
  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  updateUserCords(socketid, x, y, bullets) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === socketid) {
        this.users[i].bullets = [];
        this.users[i].x = x;
        this.users[i].y = y;
        this.users[i].bullets = bullets;
      }
    }
  }

  getUserList(room) {
    let newArray = [];
    let users = this.users.filter(user => user.room === room);
    let namesArray = users.map(user => user.name);
    users.map(user => {
      if (user.avatar) {
        let temppush = { name: user.name, avatar: user.avatar };
      } else {
        let temppush = { name: user.name };
      }
      newArray.push(temppush);
    });
    return newArray;
  }

  getUserName(name, room) {
    if (this.users.length > 0) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].name === name && this.users[i].room === room) {
          return 1;
        }
      }
    } else {
      return 0;
    }
  }

  getUserAvatar(name, room) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name === name && this.users[i].room === room) {
        if (this.users[i].avatar) {
          return this.users[i].avatar;
        }
      }
    }
  }

  getRoomList() {
    let Currentrooms = [];
    this.users.map(dat => {
      Currentrooms.push(dat.room);
    });
    let Currentrooms;

    let newArr = Currentrooms;

    for (let h = 0; h < Currentrooms.length; h++) {
      let curItem = Currentrooms[h];
      let foundCount = 0;
      // search array for item
      for (let i = 0; i < Currentrooms.length; i++) {
        if (Currentrooms[i] == Currentrooms[h]) foundCount++;
      }
      if (foundCount > 1) {
        // remove repeated item from new array
        for (let j = 0; j < newArr.length; j++) {
          if (newArr[j] == curItem) {
            newArr.splice(j, 1);
            j = j - 1;
          }
        }
      }
    }
    return newArr;
  }

  getUserSocketList(room) {
    let users = this.users.filter(user => user.room === room);
    let socketsArray = users.map(user => user.id);

    return socketsArray;
  }
}

module.exports = { Users };
