import React, { Component } from "react";
import "./App.css";
import Tests from "./components/tests/testApp";
import LobbyRefactored from "./components/lobby/lobby";
import LandingPageRefactored from "./components/landing/landingPage";
import Game from "./components/game/game";

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

    this.props.socket.on("ROOM_UPDATE", data => {
      if (this.state.roomData !== null) {
        let roomData = this.state.roomData;
        roomData.roomUsers = data.users;
        roomData.roomLeader = data.leader;
        this.setState({ roomData: roomData });
      }
    });

    // this.props.socket.on("SEND_USER", data => {
    //   this.setState({
    //     userName: data.name
    //   });
    // });
  }

  render() {
    return <div className="App">{this.setLocation()}</div>;
    // return (
    //   <Tests
    //     socket={this.props.socket}
    //     testSet="DRAWING_GAME"
    //     testName="GUESSING_PHASE"
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
