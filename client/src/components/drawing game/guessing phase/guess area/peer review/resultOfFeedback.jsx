import React, { Component } from "react";

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
        {this.props.peerResult.owner} thought you drew a{" "}
        {this.props.peerResult.guess}
      </h3>
    );
  }
}

export default ResultOfFeedback;
