import React, { Component } from "react";
import "./App.css";
import Tests from "./components/tests/testApp";
import Lobby from "./components/lobby/lobby";
import LandingPage from "./components/landing/landingPage";
import Game from "./components/game/game";
import ErrorPage from "./components/error page/errorPage";
import SettingsData from "./data/settingsData";
import RoomBuffer from "./components/room buffer/roomBuffer";
import ClientData from "./data/clientData";
import RoomData from "./data/roomData";
import ErrorMessages from "./data/errorMessages";

class App extends Component {
  constructor(props) {
    super(props);
    this.errorMessages = new ErrorMessages(errorMessage => {
      console.log(errorMessage);
      this.setState({ location: "ERROR" });
    });

    this.state = {
      location: "LANDING",
      clientData: null,
      roomData: null,
      settingsData: new SettingsData(this.errorMessages)
    };

    this.handleLandingSubmit = this.handleLandingSubmit.bind(this);
    this.handleLobbySubmit = this.handleLobbySubmit.bind(this);
    this.handleUserReturn = this.handleUserReturn.bind(this);
    this.handleRoomBufferFlush = this.handleRoomBufferFlush.bind(this);

    this.props.socket.on("GAME_START", data => {
      this.setState(
        {
          location: "GAME"
        },
        () => {
          if (
            this.state.clientData.userName === this.state.roomData.roomLeader
          ) {
            this.props.socket.emit("SET_LOCATION", this.state.location);
          }
        }
      );
    });

    this.props.socket.on("ROOM_UPDATE", data => {
      if (this.state.roomData !== null) {
        const roomData = this.state.roomData;
        roomData.roomUsers = data.users;
        roomData.activeUsers = data.activeUsers;
        roomData.roomBufferUsers = data.bufferedUsers;
        roomData.roomLeader = data.leader;

        this.setState({ roomData: roomData });
      }
    });

    this.props.socket.on("ROOM_SETTINGS_UPDATE", settings => {
      if (this.state.roomData !== null) {
        let settingsData = this.state.settingsData;
        settingsData.roomSettings = settings;
        this.setState({ settingsData: settingsData });
      }
    });
  }

  render() {
    return <div className="App">{this.setLocation()}</div>;
    // return (
    //   <Tests
    //     socket={this.props.socket}
    //     testSet="DRAWING_GAME"
    //     testName="DRAWING_CANVAS"
    //   />
    // );
  }

  setLocation() {
    switch (this.state.location) {
      case "LANDING":
        return (
          <LandingPage
            handleSubmit={this.handleLandingSubmit}
            socket={this.props.socket}
            onUserReturn={this.handleUserReturn}
          />
        );
      case "LOBBY":
        return (
          <Lobby
            socket={this.props.socket}
            onSubmit={this.handleLobbySubmit}
            roomData={this.state.roomData}
            clientData={this.state.clientData}
            settingsData={this.state.settingsData}
            errors={this.errorMessages}
          />
        );
      case "GAME":
        return (
          <Game
            socket={this.props.socket}
            roomData={this.state.roomData}
            clientData={this.state.clientData}
            settingsData={this.state.settingsData}
            errors={this.errorMessages}
          />
        );
      case "ROOM_BUFFER":
        return (
          <RoomBuffer
            userName={this.state.clientData.userName}
            socket={this.props.socket}
            roomData={this.state.roomData}
            onBufferFlush={this.handleRoomBufferFlush}
          />
        );
      case "ERROR":
        return (
          <ErrorPage
            socket={this.props.socket}
            error={this.errorMessages.currentErrorMessage}
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
        this.errorMessages.userName = clientData.userName;
        if (this.state.clientData.userName === this.state.roomData.roomLeader) {
          this.props.socket.emit("SET_LOCATION", this.state.location);
        }
      }
    );
  }

  handleUserReturn(data) {
    console.log("RETURNING USER DATA", data);
    let currentLocation;
    const roomData = new RoomData(
      data.roomName,
      data.leader,
      data.roomUsers,
      data.activeUsers
    );
    if (data.location !== "LOBBY") {
      currentLocation = "ROOM_BUFFER";
    } else {
      currentLocation = "LOBBY";
    }
    this.setState(
      {
        clientData: new ClientData(data.user),
        location: currentLocation,
        roomData: roomData
      },
      () => {
        console.log("RETURN STATE", this.state);
      }
    );
  }

  handleLobbySubmit() {
    this.props.socket.emit("START_GAME_REQ");
  }

  handleRoomBufferFlush() {
    this.state.settingsData.getSettings();
    console.log(this.state.roomData, "Post flush roomData");
    this.setState({
      location: "GAME"
    });
  }
}

export default App;
