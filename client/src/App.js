import React, { Component } from "react";
import "./App.css";
import Tests from "./components/tests/testApp";
import LobbyRefactored from "./components/lobby/lobby";
import LandingPageRefactored from "./components/landing/landingPage";
import Game from "./components/game/game";
import SettingsData from "./data/settingsData";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "LANDING",
      clientData: null,
      roomData: null,
      settingsData: new SettingsData()
    };

    this.handleLandingSubmit = this.handleLandingSubmit.bind(this);
    this.handleLobbySubmit = this.handleLobbySubmit.bind(this);

    this.props.socket.on("GAME_START", data => {
      this.setState({
        location: "GAME"
      });
    });

    this.props.socket.on("ROOM_UPDATE", data => {
      if (this.state.roomData !== null) {
        let roomData = this.state.roomData;
        roomData.roomUsers = data.users;
        roomData.roomLeader = data.leader;
        this.setState({ roomData: roomData });
      }
    });

    this.props.socket.on("ROOM_SETTINGS_UPDATE", settings => {
      console.log("room settings update");

      if (this.state.roomData !== null) {
        let settingsData = this.state.settingsData;
        settingsData.roomSettings = settings;
        this.setState({ settingsData: settingsData });
      }
    });
  }

  render() {
    // return <div className="App">{this.setLocation()}</div>;
    return (
      <Tests
        socket={this.props.socket}
        testSet="DRAWING_GAME"
        testName="INPUT_GUESS"
      />
    );
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
            settingsData={this.state.settingsData}
          />
        );
      case "GAME":
        return (
          <Game
            socket={this.props.socket}
            roomData={this.state.roomData}
            clientData={this.state.clientData}
            settingsData={this.state.settingsData}
          />
        );
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
