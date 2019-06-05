import React, { Component } from "react";
import Result from "./result of feedback/resultOfFeedback";
import "./peerReview.css";

class PeerReview extends Component {
  render() {
    if (this.props.gotResult) {
      return (
        <div
          className="peer-review"
          style={{ bottom: window.innerHeight * 0.35 + "px" }}
        >
          <Result
            peerResult={this.props.peerResult}
            clientData={this.props.clientData}
            onScoreUpdate={this.props.onScoreUpdate}
          />
        </div>
      );
    } else {
      return (
        <div
          className="peer-review"
          style={{ bottom: window.innerHeight * 0.35 + "px" }}
        >
          <h3 className="peer-review-pre-text">Awaiting Feedback...</h3>
        </div>
      );
    }
  }
}

export default PeerReview;
