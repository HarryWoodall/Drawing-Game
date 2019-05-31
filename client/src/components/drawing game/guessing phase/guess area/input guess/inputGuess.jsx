import React, { Component } from "react";
import QueryUser from "./query user/queryUser";
import SelectionButtons from "./selection buttons/selectionButtons";
import PeerReview from "../peer review/peerReview";
import "./inputGuess.css";

class InputGuess extends Component {
  constructor() {
    super();
    this.handleSelection = this.handleSelection.bind(this);
  }
  render() {
    return (
      <React.Fragment>
        {/* <QueryUser /> */}
        <h1 className="query-user">What is it?</h1>
        <PeerReview
          gotResult={this.props.gotPeerReview}
          peerResult={this.props.peerResult}
          clientData={this.props.clientData}
          onScoreUpdate={this.props.onScoreUpdate}
        />
        {this.props.clientData.peerDrawing ? (
          <SelectionButtons
            clientData={this.props.clientData}
            onSelection={this.handleSelection}
          />
        ) : null}
      </React.Fragment>
    );
  }

  handleSelection(data) {
    this.props.onSelection();
    this.props.socket.emit("GUESS_SUBMISSION", data);
  }
}

export default InputGuess;
