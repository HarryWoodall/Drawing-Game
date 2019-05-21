import React, { Component } from "react";
import "./score.css";

class Score extends Component {
  constructor() {
    super();
    this.state = {
      score: 0
    };
  }
  render() {
    return (
      <div id="score">
        <h2>{this.state.score}</h2>
      </div>
    );
  }

  addScore(ammount) {
    this.setState({
      score: this.state.score + ammount
    });
  }
}

export default Score;
