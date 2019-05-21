import React, { Component } from "react";
import QueryUser from "./query user/queryUser";
import SelectionButtons from "./selection buttons/selectionButtons";
import PeerReview from "../peer review/peerReview";

class InputGuess extends Component {
  render() {
    return (
      <React.Fragment>
        <QueryUser />
        <PeerReview gotResult={this.props.gotPeerReview} />
        <SelectionButtons />
      </React.Fragment>
    );
  }
}

export default InputGuess;
