import React, { Component } from "react";
import DrawingPhase from "./drawing phase/drawingPhase";
import GuessingPhase from "./guessing phase/guessingPhase";

class DrawingGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: "DRAWING"
    };
    this.handleDrawingCompletion = this.handleDrawingCompletion.bind(this);
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);

    this.props.socket.on("GAME_COMPLETE", () => {
      setTimeout(() => {
        this.props.onGameCompletion();
        this.setState({ phase: "DRAWING" }, () => {
          this.props.clientData.reset();
        });
      }, 1000);
    });
  }

  render() {
    if (this.state.phase === "DRAWING") {
      return (
        <DrawingPhase
          socket={this.props.socket}
          otherProp={"MyProp"}
          drawingCompletion={this.handleDrawingCompletion}
          clientData={this.props.clientData}
        />
      );
    } else if (this.state.phase === "GUESSING") {
      return (
        <GuessingPhase
          socket={this.props.socket}
          clientData={this.props.clientData}
          onScoreUpdate={this.handleScoreUpdate}
        />
      );
    }
  }

  handleDrawingCompletion() {
    this.setState({
      phase: "GUESSING"
    });
  }

  handleScoreUpdate() {
    this.props.onScoreUpdate();
  }
}

export default DrawingGame;
