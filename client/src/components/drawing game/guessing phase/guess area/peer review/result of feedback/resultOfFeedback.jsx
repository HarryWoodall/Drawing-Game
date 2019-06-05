import React, { Component } from "react";
import "./resultOfFeedback.css";

class ResultOfFeedback extends Component {
  render() {
    let className = "peer-result";
    if (this.props.peerResult.answer === this.props.peerResult.guess) {
      className += " peer-result-correct";
    } else {
      className += " peer-result-incorrect";
    }

    return (
      <h3 className={className}>
        <span className="peer-result-username">
          {this.props.peerResult.owner}
        </span>{" "}
        thought you drew a {this.props.peerResult.guess}
      </h3>
    );
  }
}

export default ResultOfFeedback;
