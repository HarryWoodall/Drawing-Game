import React, { Component } from "react";
import "./App.css";
import DrawingGame from "./components/games/drawingGame01/drawingGame01.jsx";
import { socketAPI } from "./sockets/api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      timestamp: "no timestamp yet"
    };
    socketAPI();
    console.log("Something");
  }

  render() {
    return (
      <div className="App">
        <DrawingGame />
        <div>timestamp</div>
      </div>
    );
  }

  socketListen() {
    this.socket.on("start", data => {
      console.log(data);
    });
  }
}

export default App;
