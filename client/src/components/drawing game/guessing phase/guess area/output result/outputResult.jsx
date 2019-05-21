import React, { Component } from "react";
import ResultText from "./result text/resultText";
import PeerReview from "../peer review/peerReview";
import ReadyButton from "./ready button/readyButton";

class OutputResult extends Component {
  render() {
    return (
      <React.Fragment>
        <ResultText />
        <PeerReview gotResult={this.props.gotPeerReview} />
        <ReadyButton />
      </React.Fragment>
    );
  }
}

export default OutputResult;
