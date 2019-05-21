import React, { Component } from "react";
import InputGuess from "./input guess/inputGuess";
import OutputResult from "./output result/outputResult";

class guessArea extends Component {
  constructor() {
    super();
    this.state = {
      gotPeerReview: false,
      hasAnsweredQuestion: false
    };

    this.testChangeState = this.testChangeState.bind(this);
    this.testChangeState();
  }

  render() {
    if (this.state.hasAnsweredQuestion) {
      return (
        <OutputResult
          gotPeerReview={this.state.gotPeerReview}
        />
      );
    } else {
      return (
        <InputGuess
          gotPeerReview={this.state.gotPeerReview}
        />
      );
    }
  }

  testChangeState() {
    setTimeout(() => {
      console.log("Question Change");

      this.setState({
        hasAnsweredQuestion: true
      });
    }, 1000);
    setTimeout(() => {
      console.log("Review Change");

      this.setState({
        gotPeerReview: true
      });
    }, 3000);
  }
}

export default guessArea;
