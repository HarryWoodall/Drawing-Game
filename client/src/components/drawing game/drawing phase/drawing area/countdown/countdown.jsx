import React, { Component } from "react";
import "./countdown.css";

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.startTimer();
    this.state = {
      currentIndex: 0
    };
    this.display = ["3", "2", "1", "Draw"];

    this.startTimer = this.startTimer.bind(this);
    this.handleCompletion = this.handleCompletion.bind(this);
  }

  render() {
    return (
      <div
        className="countdown"
        // style={{ top: yOffset / 3 }}
      >
        <h1>{this.display[this.state.currentIndex]}</h1>
      </div>
    );
  }

  startTimer() {
    let timer = setInterval(() => {
      if (this.state.currentIndex === this.display.length - 1) {
        clearTimeout(timer);
        this.handleCompletion();
      } else {
        this.setState({
          currentIndex: this.state.currentIndex + 1
        });
      }
    }, 300);
  }

  handleCompletion() {
    this.props.isComplete();
  }
}

export default Countdown;
