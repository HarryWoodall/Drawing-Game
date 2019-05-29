import React, { Component } from "react";
import "./resultText.css";

class ResultText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCorrect:
        this.props.clientData.peerDrawing.suggestion ===
        this.props.clientData.guess
    };

    if (this.state.isCorrect) {
      this.props.clientData.score++;
      this.handleScoreUpdate();
    }
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
  }

  render() {
    if (this.state.isCorrect) {
      return (
        <h1 className="output-result">
          Correct, {this.props.clientData.peerDrawing.owner} drew a{" "}
          {this.props.clientData.peerDrawing.suggestion}
        </h1>
      );
    } else {
      return (
        <h1 className="output-result">
          Incorrect, {this.props.clientData.peerDrawing.owner} drew a{" "}
          {this.props.clientData.peerDrawing.suggestion}
        </h1>
      );
    }
  }

  handleScoreUpdate() {
    this.props.onScoreUpdate();
  }
}

export default ResultText;
