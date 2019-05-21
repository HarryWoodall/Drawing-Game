import React, { Component } from "react";
import DrawingPhase from "./drawing phase/drawingPhase";
import GuessingPhase from "./guessing phase/guessingPhase";

class DrawingGame extends Component {
  constructor() {
    super();
    this.state = {
      phase: "DRAWING"
    };
    this.handleDrawingCompletion = this.handleDrawingCompletion.bind(this);
  }

  render() {
    if (this.state.phase === "DRAWING") {
      return (
        <DrawingPhase
          socket={this.props.socket}
          otherProp={"MyProp"}
          drawingCompletion={this.handleDrawingCompletion}
        />
      );
    } else if (this.state.phase === "GUESSING") {
      return <GuessingPhase socket={this.props.socket} />;
    }
  }

  handleDrawingCompletion() {
    this.setState({
      phase: "GUESSING"
    });
  }
}

export default DrawingGame;
