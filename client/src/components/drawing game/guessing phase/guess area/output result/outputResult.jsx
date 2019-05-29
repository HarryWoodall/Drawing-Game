import React, { Component } from "react";
import ResultText from "./result text/resultText";
import PeerReview from "../peer review/peerReview";

class OutputResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameComplete: false
    };
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);

    this.props.socket.on("GAME_COMPLETE", () => {
      this.setState({ isGameComplete: true });
    });
  }
  render() {
    return (
      <React.Fragment>
        <ResultText
          clientData={this.props.clientData}
          onScoreUpdate={this.handleScoreUpdate}
        />
        <PeerReview
          gotResult={this.props.gotPeerReview}
          peerResult={this.props.peerResult}
          clientData={this.props.clientData}
          onScoreUpdate={this.handleScoreUpdate}
        />
      </React.Fragment>
    );
  }

  handleScoreUpdate() {
    this.props.onScoreUpdate();
  }
}

export default OutputResult;
