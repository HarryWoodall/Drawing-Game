import React, { Component } from "react";
import "./App.css";
import DrawingGame01 from "./components/games/drawingGame01/drawingGame01-A.jsx";
import Lobby from "./components/lobby/lobby";
import LandingPage from "./components/landing/landingPage";
import readyTableTest from "./components/tests/readyTableTest";
import ReadyTableTest from "./components/tests/readyTableTest";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "LANDING" //DEFAULT = LANDING
    };

    this.landingSubmitHandleClick = this.landingSubmitHandleClick.bind(this);
    this.lobbySubmitHandleClick = this.lobbySubmitHandleClick.bind(this);

    this.props.socket.on("GAME_START", data => {
      this.setState({
        location: "DRAWING_GAME_01"
      });
    });

    this.props.socket.on("SEND_USER", data => {
      this.setState({
        userName: data.name
      });
    });
  }

  render() {
    return <div className="App">{this.setLocation()}</div>;
  }

  setLocation() {
    switch (this.state.location) {
      case "LANDING":
        return <LandingPage handleSubmit={this.landingSubmitHandleClick} />;
      case "LOBBY":
        return (
          <Lobby
            socket={this.props.socket}
            submitHandle={this.lobbySubmitHandleClick}
          />
        );
      case "DRAWING_GAME_01":
        return (
          <DrawingGame01
            socket={this.props.socket}
            userName={this.state.userName}
          />
        );
      case "TEST":
        return <ReadyTableTest />;
      default:
        return null;
    }
  }

  landingSubmitHandleClick() {
    console.log("click");
    this.setState(
      {
        location: "LOBBY"
      },
      () => {
        this.props.socket.emit("GET_USER");
      }
    );
  }

  lobbySubmitHandleClick() {
    console.log("click");

    this.props.socket.emit("START_GAME_REQ");
  }
}

export default App;
