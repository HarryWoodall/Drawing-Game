import React, { Component } from "react";
import LeaderBoard from "./leaderboard/leaderboard";
import ReadyButton from "./ready button/readyButton";
import Overlay from "./overlay/overlay";
import "./intermission.css";
import { Socket } from "dgram";

class Intermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      hasRecievedScoreData: false
    };

    this.props.socket.emit("GET_ROOM_LEADERBOARD");
    this.props.socket.on("ROOM_LEADERBOARD", data => {
      console.log(data);
      this.props.roomData.scoreData = data;

      this.setState({ hasRecievedScoreData: true });
    });

    this.handleReadyToggle = this.handleReadyToggle.bind(this);
  }

  render() {
    return (
      <div id="intermission-container">
        {this.state.hasRecievedScoreData ? (
          <LeaderBoard
            roomData={this.props.roomData}
            clientData={this.props.clientData}
          />
        ) : null}
        <ReadyButton onReady={this.handleReadyToggle} />
        {this.state.isReady ? <Overlay /> : null}
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
