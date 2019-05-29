import React, { Component } from "react";
import DrawingGame from "../drawing game/drawingGame";
import Intermission from "./intermission/intermission";
import Score from "./score/score";
import "./game.css";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      game: "DRAWING_GAME",
      roundEnd: false,
      roundCount: 0
    };

    this.handleGameCompletion = this.handleGameCompletion.bind(this);
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
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
            />
          );
          break;
        default:
          currentGame = "Invalid Game";
          break;
      }

      let content = (
        <div className="game-container">
          <Score
            clientData={this.props.clientData}
            socket={this.props.socket}
          />
          {currentGame}
        </div>
      );

      return content;
    }
  }

  handleGameCompletion() {
    console.log("game complete");

    if (this.state.roundCount === 0) {
      this.setState({ roundEnd: true, roundCount: 0 });
    } else {
      this.setState({ roundCount: this.state.roundCount + 1 });
    }
  }

  handleScoreUpdate() {
    console.log("score update");

    this.forceUpdate();
  }
}

export default Game;
