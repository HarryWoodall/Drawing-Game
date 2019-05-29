import React, { Component } from "react";
import "./lobbyReadyButton.css";

class LobbyReadyButton extends Component {
  render() {
    if (this.props.clientData.userName === this.props.roomData.roomLeader) {
      return (
        <input
          type="submit"
          id="lobby-ready-button"
          className="button"
          value="Start"
          onClick={this.props.onSubmit}
        />
      );
    } else {
      return <span className="non-leader" />;
    }
  }
}

export default LobbyReadyButton;
