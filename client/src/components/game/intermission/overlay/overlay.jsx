import React, { Component } from "react";
import ReadyList from "./ready list/readyList";
import "./overlay.css";

class Overlay extends Component {
  render() {
    return (
      <div id="intermission-overlay">
        <ReadyList socket={this.props.socket} roomData={this.props.roomData} />
      </div>
    );
  }
}

export default Overlay;
