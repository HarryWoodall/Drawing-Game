import React, { Component } from "react";
import InputGuess from "./input guess/inputGuess";
import OutputResult from "./output result/outputResult";

class guessArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotPeerReview: false,
      hasAnsweredQuestion: false,
      peerResult: null
    };

    this.handleUserSelection = this.handleUserSelection.bind(this);
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);

    this.props.socket.on("RETURN_ANSWER", data => {
      if (data.guess === data.answer) {
        console.log("correct");
        this.props.clientData.score++;
        this.handleScoreUpdate();
      }

      this.setState({
        peerResult: data,
        gotPeerReview: true
      });
    });
  }

  render() {
    if (this.state.hasAnsweredQuestion) {
      return (
        <OutputResult
          gotPeerReview={this.state.gotPeerReview}
          peerResult={this.state.peerResult}
          clientData={this.props.clientData}
          socket={this.props.socket}
          onScoreUpdate={this.handleScoreUpdate}
        />
      );
    } else {
      return (
        <InputGuess
          gotPeerReview={this.state.gotPeerReview}
          clientData={this.props.clientData}
          socket={this.props.socket}
          peerResult={this.state.peerResult}
          onSelection={this.handleUserSelection}
          onScoreUpdate={this.handleScoreUpdate}
        />
      );
    }
  }

  handleUserSelection() {
    this.setState({ hasAnsweredQuestion: true });
  }

  handleScoreUpdate() {
    this.props.onScoreUpdate();
  }
}

export default guessArea;
