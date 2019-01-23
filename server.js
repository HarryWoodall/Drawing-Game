const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const sockets = require("./sockets");
const io = new sockets(server);

app.use(bodyParser());
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/test", (req, res) => {
  const test = [{ id: 0, item: 1 }, { id: 1, item: 2 }, { id: 3, item: 3 }];
  res.json(test);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/public/index.html"));
});

io.startSocket();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port " + port));
