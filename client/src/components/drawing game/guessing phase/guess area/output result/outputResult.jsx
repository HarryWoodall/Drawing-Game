import React, { Component } from "react";
import ResultText from "./result text/resultText";
import PeerReview from "../peer review/peerReview";

class OutputResult extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      isGameComplete: false
    };

    this.props.socket.on("GAME_COMPLETE", () => {
      if (this._isMounted) {
        this.setState({ isGameComplete: true });
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
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
