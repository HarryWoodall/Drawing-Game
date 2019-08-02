import React, { Component } from "react";
import ResultText from "./result text/resultText";
import PeerReview from "../peer review/peerReview";

class OutputResult extends Component {
  render() {
    return (
      <React.Fragment>
        <ResultText
          clientData={this.props.clientData}
          onScoreUpdate={this.props.onScoreUpdate}
        />
        <PeerReview
          gotResult={this.props.gotPeerReview}
          peerResult={this.props.peerResult}
          clientData={this.props.clientData}
          onScoreUpdate={this.props.onScoreUpdate}
        />
      </React.Fragment>
    );
  }
}

export default OutputResult;
