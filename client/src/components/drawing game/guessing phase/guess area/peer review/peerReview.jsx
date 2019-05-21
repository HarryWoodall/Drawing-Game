import React, { Component } from "react";
import AwaitingFeedback from "./awaitingFeedback";
import Result from "./resultOfFeedback";
import "./peerReview.css";

class PeerReview extends Component {
  render() {
    if (this.props.gotResult) {
      return (
        <div className="peer-review">
          <Result />
        </div>
      );
    } else {
      return (
        <div className="peer-review">
          <AwaitingFeedback />
        </div>
      );
    }
  }
}

export default PeerReview;
