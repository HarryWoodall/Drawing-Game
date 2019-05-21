import React, { Component } from "react";
import DrawingGame from "../drawing game/drawingGame";
import Score from "../score/score";
import "./game.css";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      game: "DRAWING_GAME"
    };
  }
  render() {
    let currentGame;
    switch (this.state.game) {
      case "DRAWING_GAME":
        currentGame = (
          <DrawingGame socket={this.props.socket} />
        );
        break;
      default:
        currentGame = "Invalid Game";
        break;
    }

    let content = (
      <div className="game-container">
        <Score />
        {currentGame}
      </div>
    );

    return content;
  }
}

export default Game;
