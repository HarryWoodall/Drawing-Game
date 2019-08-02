import React, { Component } from "react";
import "./resultText.css";

class ResultText extends Component {
  constructor(props) {
    super(props);
    this.isCorrect =
      this.props.clientData.peerDrawing.suggestion ===
      this.props.clientData.guess;

    if (this.isCorrect) {
      this.props.clientData.score++;
      this.props.onScoreUpdate(true);
    }
  }

  render() {
    if (this.props.clientData.peerDrawing) {
      const output = (
        <h1 className="output-result-text">
          <span className="peer-username">
            {this.props.clientData.peerDrawing.owner}
          </span>{" "}
          drew a {this.props.clientData.peerDrawing.suggestion}
        </h1>
      );
      if (this.isCorrect) {
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
    return null;
  }
}

export default ResultText;
