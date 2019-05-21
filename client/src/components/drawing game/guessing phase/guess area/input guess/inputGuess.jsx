import React, { Component } from "react";
import QueryUser from "./query user/queryUser";
import SelectionButtons from "./selection buttons/selectionButtons";
import PeerReview from "../peer review/peerReview";
import "./inputGuess.css";

class InputGuess extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <QueryUser /> */}
        <h1 className="query-user">What is it?</h1>
        <PeerReview gotResult={this.props.gotPeerReview} />
        <SelectionButtons />
      </React.Fragment>
    );
  }
}

export default InputGuess;
