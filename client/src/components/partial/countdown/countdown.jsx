import React, { Component } from "react";
import "./countdown.css";

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      running: false,
      ran: false
    };
    this.timer = null;

    this.startTimer = this.startTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
  }

  componentDidUpdate() {
    if (this.props.enable && !this.state.running) {
      this.resetTimer();
      this.startTimer();
    }
  }

  render() {
    return (
      <div
        id="countdown-container"
        style={{ height: window.innerHeight * 0.7 }}
      >
        <h1 id="countdown-content">{this.props.content[this.state.index]}</h1>
      </div>
    );
  }

  startTimer() {
    console.log("countdown props", this.props);
    this.timer = setInterval(() => {
      if (this.state.index < this.props.content.length) {
        this.setState({ index: this.state.index + 1 });
      } else {
        this.endTimer();
      }
    }, (this.props.duration * 1000) / this.props.content.length);
    this.setState({ running: true });
  }

  endTimer() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.setState({ running: false, ran: true });
    }
  }

  resetTimer() {
    this.setState({ index: 0, running: false, ran: false });
  }
}

export default Countdown;
