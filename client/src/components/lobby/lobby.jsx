import React, { Component } from "react";
import LobbyUserList from "./lobby user list/lobbyUserList";
import LobbyReadyButton from "./lobby-ready-button/lobbyReadyButton";
import Socket from "../../sockets/socket";
import "./lobby.css";

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(this.props.socket)
    };
    this.state.socket.connect();
    // this.state.socket.roomUpdate(data => {
    //   this.props.roomData.roomUsers = data.users;
    //   this.props.roomData.roomLeader = data.leader;
    //   this.forceUpdate();
    // });

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
