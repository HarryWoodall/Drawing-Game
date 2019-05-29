import React, { Component } from "react";
import StartButton from "../partial/primaryButton";
import LobbyUserList from "./lobby user list/lobbyUserList";
import "./lobbyRefactored.css";
import LobbyReadyButton from "./lobby-ready-button/lobbyReadyButton";

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: props.socket
    };
    this.props.socket.connect();
    this.props.socket.on("ROOM_UPDATE", data => {
      this.props.roomData.roomUsers = data.users;
      this.props.roomData.roomLeader = data.leader;
      this.forceUpdate();
    });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <div id="lobby-header">
          <h1 id="lobby-room-name">{this.props.roomData.roomName}</h1>
          <h3>lobby</h3>
        </div>
        <LobbyUserList
          roomData={this.props.roomData}
          clientData={this.props.clientData}
        />
        <LobbyReadyButton
          roomData={this.props.roomData}
          clientData={this.props.clientData}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }

  handleSubmit() {
    this.props.onSubmit();
  }
}

export default Lobby;
