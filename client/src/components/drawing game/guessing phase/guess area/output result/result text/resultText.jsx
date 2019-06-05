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
    const output = (
      <h1 className="output-result-text">
        <span className="peer-username">
          {this.props.clientData.peerDrawing.owner}
        </span>{" "}
        drew a {this.props.clientData.peerDrawing.suggestion}
      </h1>
    );
    if (this.state.isCorrect) {
      return (
        <div className="output-result-container">
          <div className="output-result output-result-correct">
            <h1 className="result-text">Correct</h1>
            {output}
          </div>
        </div>
      );
    } else {
      return (
        <div className="output-result-container">
          <div className="output-result output-result-incorrect">
            <h1 className="result-text">Incorrect</h1>
            {output}
          </div>
        </div>
      );
    }
  }
}

export default ResultText;
