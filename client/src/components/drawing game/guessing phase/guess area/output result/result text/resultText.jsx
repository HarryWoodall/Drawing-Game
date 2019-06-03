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
      this.props.onScoreUpdate();
    }
  }

  render() {
    if (this.state.isCorrect) {
      return (
        <div className="output-result-container">
          <h1 className="output-result">
            Correct, {this.props.clientData.peerDrawing.owner} drew a{" "}
            {this.props.clientData.peerDrawing.suggestion}
          </h1>
        </div>
      );
    } else {
      return (
        <div className="output-result-container">
          <h1 className="output-result">
            Incorrect, {this.props.clientData.peerDrawing.owner} drew a{" "}
            {this.props.clientData.peerDrawing.suggestion}
          </h1>
        </div>
      );
    }
  }
}

export default ResultText;
