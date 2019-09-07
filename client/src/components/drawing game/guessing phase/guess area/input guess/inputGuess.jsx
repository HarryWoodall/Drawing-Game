import React, { Component } from "react";
import SelectionButtons from "./selection buttons/selectionButtons";
import PeerReview from "../peer review/peerReview";

class InputGuess extends Component {
  constructor() {
    super();
    this.handleSelection = this.handleSelection.bind(this);
  }
  render() {
    return (
      <React.Fragment>
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
            errors={this.props.errors}
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
