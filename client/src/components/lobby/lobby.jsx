import React, { Component } from "react";
import LobbyUserList from "./lobby user list/lobbyUserList";
import LobbyReadyButton from "./lobby-ready-button/lobbyReadyButton";
import Socket from "../../sockets/socket";
import Settings from "../game/settings/settings";
import "./lobby.css";

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(this.props.socket),
      settingsAvaiable: false
    };
    this.state.socket.connect();
    this.props.settingsData.getSettings(this.props.roomData.roomName, () => {
      this.setState({ settingsAvaiable: true });
    });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        {this.props.clientData.userName === this.props.roomData.roomLeader &&
        this.state.settingsAvaiable ? (
          <Settings
            settingsData={this.props.settingsData}
            socket={this.props.socket}
            location="Lobby"
          />
        ) : null}
        <div id="lobby-wrapper">
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
      </div>
    );
  }

  handleSubmit() {
    this.props.onSubmit();
  }
}

export default Lobby;
