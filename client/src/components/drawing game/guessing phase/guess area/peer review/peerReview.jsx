import React, { Component } from "react";
import AwaitingFeedback from "./awaitingFeedback";
import Result from "./resultOfFeedback";
import "./peerReview.css";

class PeerReview extends Component {
  constructor() {
    super();
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
  }

  render() {
    if (this.props.gotResult) {
      return (
        <div className="peer-review">
          <Result
            peerResult={this.props.peerResult}
            clientData={this.props.clientData}
            onScoreUpdate={this.handleScoreUpdate}
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

  handleScoreUpdate() {
    this.props.onScoreUpdate();
  }
}

export default PeerReview;
