import React, { Component } from "react";
import Socket from "../../sockets/socket";
import "./roomBuffer.css";

class RoomBuffer extends Component {
  constructor() {
    super();
    this.state = {
      socket: new Socket(this.props.socket)
    };
  }
  render() {
    return (
      <div id="room-buffer">
        <h1
          className="room-buffer-header room-buffer-main-header"
          style={{ top: window.innerHeight * 0.35 }}
        >
          Welcome Back {this.props.userName}
        </h1>

        <h2
          className="room-buffer-header"
          style={{ top: window.innerHeight * 0.35 }}
        >
          Waiting for round to end
        </h2>

        <h3
          className="room-buffer-header room-buffer-submit-hint"
          style={{ top: window.innerHeight * 0.7 }}
        >
          Click here to permantly exit this room
        </h3>
        <input
          type="submit"
          className="room-buffer-submit button"
          value="Exit Room"
          style={{ top: window.innerHeight * 0.7 }}
        />
      </div>
    );
  }
}

export default RoomBuffer;
