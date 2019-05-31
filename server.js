const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sockets = require("./resources/sockets");
const Users = new require("./resources/user-list");
const Rooms = new require("./resources/room-list");
const User = require("./resources/user");
const Room = require("./resources/room");

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log("Server started on port " + port)
);
const sess = session({
  secret: "this is my session secret",
  resave: false,
  saveUninitialized: true
});
const userList = new Users();
const roomList = new Rooms();
const io = new sockets(server, sess, roomList, userList);
io.startSocket();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sess);
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  console.log(req);

  res.sendFile(path.join(__dirname + "/client/build/public/index.html"));
});

app.post("/", (req, res) => {
  console.log(req.body);
  let roomName = req.body.roomName;
  let userName = req.body.userName;
  let data = {};

  // Error Checking
  if (userList.checkUserExists(req.session.id)) {
    data.success = false;
    data.error = "USER_ALREADY_EXISTS";
    res.send(data);
    return;
  }

  if (!req.body.newRoom) {
    if (!roomList.checkRoomExists(roomName)) {
      data.success = false;
      data.error = "ROOM_NOT_FOUND";
      res.send(data);
      return;
    } else if (roomList.getRoom(roomName).nameTaken(userName)) {
      data.success = false;
      data.error = "USERNAME_TAKEN";
      res.send(data);
      return;
    }
  }

  let user;
  let room;
  if (req.body.newRoom) {
    room = new Room(roomList.createRoomName());
    user = new User(req.session.id, userName, room.name, true);
    room.addUser(user);
    roomList.addRoom(room);
  } else {
    room = roomList.getRoom(roomName);
    user = new User(req.session.id, userName, roomName, false);
    room.addUser(user);
  }

  userList.addUser(user);

  data.success = true;
  data.room = room;
  res.send(data);
});

app.get("/api/users", (req, res) => {
  res.send(userList.users);
});

app.get("/api/drawing/categories", (req, res) => {
  res.sendFile(__dirname + "/resources/drawingCategories.json");
});

app.get("/api/drawing/categories/random/:ammount", (req, res) => {
  let drawingData;
  let resCategories = [];

  fs.readFile("./resources/drawingCategories.json", (err, data) => {
    if (err) {
      throw err;
    }

    drawingData = JSON.parse(data).categories;

    for (let i = 0; i < parseInt(req.params.ammount); i++) {
      let index = Math.floor(Math.random() * drawingData.length);
      resCategories.push(drawingData[index]);
      drawingData.splice(index, 1);
    }

    res.send(resCategories);
  });
});
