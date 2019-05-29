import React, { Component } from "react";
import "./App.css";
import Lobby from "./components/lobby/lobby";
import LandingPage from "./components/landing/landingPage";
import readyTableTest from "./components/tests/readyTableTest";
import ReadyTableTest from "./components/tests/readyTableTest";
import Tests from "./components/tests/testApp";
import LobbyRefactored from "./components/lobby/lobbyRefactored";
import LandingPageRefactored from "./components/landing/landingPageRefactored";
import Game from "./components/game/game";
import ClientData from "./data/clientData";
import RoomData from "./data/roomData";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "LANDING",
      clientData: null,
      roomData: null
    };

    this.handleLandingSubmit = this.handleLandingSubmit.bind(this);
    this.handleLobbySubmit = this.handleLobbySubmit.bind(this);

    this.props.socket.on("GAME_START", data => {
      this.setState({
        location: "GAME"
      });
    });

    this.props.socket.on("SEND_USER", data => {
      this.setState({
        userName: data.name
      });
    });

    // fetch("/api/drawing/categories/random/1")
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log("data", data);

    //     this.setState(
    //       {
    //         suggestion: data[0]
    //       },
    //       () => {
    //         this.startCountdown();
    //       }
    //     );
    //   });
  }

  render() {
    return <div className="App">{this.setLocation()}</div>;
    // return (
    //   <Tests
    //     socket={this.props.socket}
    //     testSet="INTERMISSION"
    //     testName="INTERMISSION"
    //   />
    // );
  }

  setLocation() {
    switch (this.state.location) {
      case "LANDING":
        return (
          <LandingPageRefactored handleSubmit={this.handleLandingSubmit} />
        );
      case "LOBBY":
        return (
          <LobbyRefactored
            socket={this.props.socket}
            onSubmit={this.handleLobbySubmit}
            roomData={this.state.roomData}
            clientData={this.state.clientData}
          />
        );
      case "GAME":
        return (
          <Game
            socket={this.props.socket}
            roomData={this.state.roomData}
            clientData={this.state.clientData}
          />
        );
      case "TEST":
        return <ReadyTableTest />;
      default:
        return null;
    }
  }

  handleLandingSubmit(clientData, roomData) {
    this.setState(
      {
        clientData: clientData,
        roomData: roomData,
        location: "LOBBY"
      },
      () => {
        this.props.socket.emit("GET_USER");
      }
    );
  }

  handleLobbySubmit() {
    this.props.socket.emit("START_GAME_REQ");
  }
}

export default App;
