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
      hasRecievedScoreData: false,
      bonusComplete: false,
      debuffSelectionAvailable: false,
      currentSelection: null
    };

    if (this.props.roomData.roomLeader === this.props.clientData.userName) {
      this.state.socket.requestRoomLeaderboard();
    }

    this.state.socket.roomLeaderboard(data => {
      this.props.roomData.scoreData = data;

      this.setState({ hasRecievedScoreData: true });
    });

    this.state.socket.debuffSelectionActive(data => {
      console.log("Person available for debuff selection", data);

      for (let name of data) {
        if (this.props.clientData.userName === name) {
          this.props.clientData.debuffSelectionAvailable = true;
        }
      }
    });

    this.handleReadyToggle = this.handleReadyToggle.bind(this);
    this.handleBonusCompletion = this.handleBonusCompletion.bind(this);
    this.handleDebuffSelection = this.handleDebuffSelection.bind(this);
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
        <h1
          className="intermission-header"
          style={{ top: window.innerHeight * 0.075 }}
        >
          Round Complete
        </h1>
        {this.state.hasRecievedScoreData ? (
          <LeaderBoard
            socket={this.props.socket}
            roomData={this.props.roomData}
            clientData={this.props.clientData}
            settingsData={this.props.settingsData}
            onScoreUpdate={this.props.onScoreUpdate}
            onBonusComplete={this.handleBonusCompletion}
            debuffSelectionAvailable={this.debuffSelectionAvailable}
            onDebuffSelection={this.handleDebuffSelection}
          />
        ) : null}
        {this.state.bonusComplete &&
        this.props.clientData.debuffSelectionAvailable &&
        this.props.roomData.roomUsers.length > 1 ? (
          <h2
            className="intermission-debuff-hint"
            style={{ top: window.innerHeight * 0.7 }}
          >
            Please select a player to debuff
          </h2>
        ) : null}
        {this.state.bonusComplete ? (
          <ReadyButton
            onReady={this.handleReadyToggle}
            socket={this.props.socket}
          />
        ) : null}
        {this.state.isReady ? (
          <Overlay socket={this.props.socket} roomData={this.props.roomData} />
        ) : null}
      </div>
    );
  }

  componentWillUnmount() {
    if (this.props.clientData.debuffSelectionAvailable) {
      this.state.socket.selectUserForDebuff(this.state.currentSelection);
    }

    this.setState({ hasRecievedScoreData: false });
  }

  handleBonusCompletion() {
    this.setState({ bonusComplete: true });
  }

  handleDebuffSelection(name) {
    if (
      this.props.clientData.debuffSelectionAvailable &&
      name !== this.props.clientData.userName
    ) {
      if (this.state.currentSelection === name) {
        this.setState({ currentSelection: null });
      } else {
        this.setState({ currentSelection: name });
      }
    }
  }

  handleReadyToggle(isReady) {
    this.setState({ isReady: isReady });
  }
}

export default Intermission;
