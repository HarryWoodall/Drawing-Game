import React, { Component } from "react";
import AwaitingFeedback from "./awaitingFeedback";
import Result from "./resultOfFeedback";

class PeerReview extends Component {
  render() {
    if (this.props.gotResult) {
      return <Result />;
    } else {
      return <AwaitingFeedback />;
    }
  }
}

export default PeerReview;
