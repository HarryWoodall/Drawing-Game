import React, { Component } from "react";
import ViewingCanvas from "./viewing canvas/viewingCanvas";
import GuessingArea from "./guess area/guessArea";

class GuessingPhase extends Component {
  render() {
    return (
      <React.Fragment>
        <ViewingCanvas socket={this.props.socket} />
        <GuessingArea />
      </React.Fragment>
    );
  }
}

export default GuessingPhase;
