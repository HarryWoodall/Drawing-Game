import React, { Component } from "react";
import DrawingGame from "../drawing game/drawingGame";
import Intermission from "./intermission/intermission";
import Score from "./score/score";
import Socket from "../../sockets/socket";
import "./game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(this.props.socket),
      game: "DRAWING_GAME",
      roundEnd: false,
      roundCount: 0
    };

    this.handleGameCompletion = this.handleGameCompletion.bind(this);
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);

    this.state.socket.roomReadyForReset(() => {
      this.setState({ roundEnd: false });
    });
  }
  render() {
    if (this.state.roundEnd) {
      return (
        <Intermission
          socket={this.props.socket}
          roomData={this.props.roomData}
          clientData={this.props.clientData}
        />
      );
    } else {
      let currentGame;
      switch (this.state.game) {
        case "DRAWING_GAME":
          currentGame = (
            <DrawingGame
              socket={this.props.socket}
              clientData={this.props.clientData}
              onGameCompletion={this.handleGameCompletion}
              onScoreUpdate={this.handleScoreUpdate}
              maxRound={0}
            />
          );
          break;
        default:
          currentGame = "Invalid Game";
          break;
      }

      let content = <div className="game-container">{currentGame}</div>;

      return content;
    }
  }

  handleGameCompletion() {
    if (this.state.roundCount === 0) {
      this.setState({ roundEnd: true, roundCount: 0 });
    } else {
      this.setState({ roundCount: this.state.roundCount + 1 });
    }
  }

  handleScoreUpdate() {
    this.props.socket.emit("UPDATE_SCORE", this.props.clientData.score);
  }
}

export default Game;
