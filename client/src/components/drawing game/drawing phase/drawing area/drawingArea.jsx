import React, { Component } from "react";
import Countdown from "./countdown/countdown";
import DrawingCanvas from "./drawing canvas/drawingCanvas";

class DrawingArea extends Component {
  constructor() {
    super();
    this.state = {
      phase: "COUNTDOWN"
    };
    this.handleCountdownCompletion = this.handleCountdownCompletion.bind(this);
  }
  render() {
    if (this.state.phase === "COUNTDOWN") {
      return (
        <Countdown
          isComplete={this.handleCountdownCompletion}
          settingsData={this.props.settingsData}
        />
      );
    } else if (this.state.phase === "DRAWING") {
      return (
        <DrawingCanvas
          socket={this.props.socket}
          isComplete={this.props.isComplete}
          clientData={this.props.clientData}
          errors={this.props.errors}
        />
      );
    }
  }

  handleCountdownCompletion() {
    this.setState({
      phase: "DRAWING"
    });
    this.props.countdownComplete();
  }
}

export default DrawingArea;
