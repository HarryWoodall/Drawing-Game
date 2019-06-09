import React, { Component } from "react";
import DrawingPhase from "./drawing phase/drawingPhase";
import GuessingPhase from "./guessing phase/guessingPhase";
import Socket from "../../sockets/socket";

class DrawingGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: "DRAWING",
      round: 0,
      socket: new Socket(this.props.socket)
    };
    this.handleDrawingCompletion = this.handleDrawingCompletion.bind(this);
    console.log(
      "Settings",
      this.props.settingsData.roomSettings.gameCompleteTime
    );

    this.state.socket.gameCompletion(() => {
      setTimeout(() => {
        console.log("game complete timeout complete");
        if (this.state.round !== this.props.maxRound) {
          this.props.onGameCompletion();
          this.props.clientData.reset();
          this.setState({ phase: "DRAWING", round: this.state.round + 1 });
        } else {
          this.setState({ round: 0 }, () => {
            this.props.onGameCompletion();
            this.props.clientData.reset();
          });
        }
      }, this.props.settingsData.roomSettings.gameCompleteTime * 1000);
    }, this.props.maxRound);
  }

  render() {
    if (this.state.phase === "DRAWING") {
      return (
        <DrawingPhase
          socket={this.props.socket}
          otherProp={"MyProp"}
          drawingCompletion={this.handleDrawingCompletion}
          clientData={this.props.clientData}
          settingsData={this.props.settingsData}
        />
      );
    } else if (this.state.phase === "GUESSING") {
      return (
        <GuessingPhase
          socket={this.props.socket}
          clientData={this.props.clientData}
          onScoreUpdate={this.props.onScoreUpdate}
        />
      );
    }
  }

  handleDrawingCompletion() {
    this.setState({
      phase: "GUESSING"
    });
  }
}

export default DrawingGame;
