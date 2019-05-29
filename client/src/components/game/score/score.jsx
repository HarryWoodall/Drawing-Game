import React, { Component } from "react";
import "./score.css";

class Score extends Component {
  constructor() {
    super();
    this.state = {
      score: 0
    };
  }

  componentDidUpdate() {
    if (this.props.clientData.score !== this.state.score) {
      this.setState({ score: this.props.clientData.score });
      this.props.socket.emit("UPDATE_SCORE", this.props.clientData.score);
    }
  }

  render() {
    return (
      <div id="score">
        <h2>{this.props.clientData.score}</h2>
      </div>
    );
  }
}

export default Score;
