import React, { Component } from "react";
import LeaderBoard from "./leaderboard/leaderboard";
import ReadyButton from "./ready button/readyButton";
import Overlay from "./overlay/overlay";
import Socket from "../../../sockets/socket";
import Settings from "../settings/settings";
import "./intermission.css";

class Intermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(this.props.socket),
      isReady: false,
      hasRecievedScoreData: false
    };

    this.state.socket.requestRoomLeaderboard();
    this.state.socket.roomLeaderboard(data => {
      console.log(data);
      this.props.roomData.scoreData = data;

      this.setState({ hasRecievedScoreData: true });
    });

    this.handleReadyToggle = this.handleReadyToggle.bind(this);
  }

  render() {
    return (
      <div id="intermission-container">
        {this.props.clientData.userName === this.props.roomData.roomLeader ? (
          <Settings
            settingsData={this.props.settingsData}
            socket={this.props.socket}
            location="Intermission"
          />
        ) : null}
        {this.state.hasRecievedScoreData ? (
          <LeaderBoard
            roomData={this.props.roomData}
            clientData={this.props.clientData}
          />
        ) : null}
        <ReadyButton
          onReady={this.handleReadyToggle}
          socket={this.props.socket}
        />
        {this.state.isReady ? (
          <Overlay socket={this.props.socket} roomData={this.props.roomData} />
        ) : null}
      </div>
    );
  }

  componentWillUnmount() {
    this.setState({ hasRecievedScoreData: false });
  }

  handleReadyToggle(isReady) {
    console.log("is Ready", isReady);

    this.setState({ isReady: isReady });
  }
}

export default Intermission;
