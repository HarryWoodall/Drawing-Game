import React, { Component } from "react";
import AwaitingFeedback from "./awaitingFeedback";
import Result from "./resultOfFeedback";
import "./peerReview.css";

class PeerReview extends Component {
  render() {
    if (this.props.gotResult) {
      return (
        <div className="peer-review">
          <Result
            peerResult={this.props.peerResult}
            clientData={this.props.clientData}
            onScoreUpdate={this.props.onScoreUpdate}
          />
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
