import React, { Component } from "react";

class TimerBar extends Component {
  constructor(props) {
    super(props);
    console.log("props", this.props);
    this.state = {
      width: 100,
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
      <div className="timer-bar" style={{ width: this.state.width + "%" }} />
    );
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.state.width > 0) {
        this.setState({ width: this.state.width - 0.1 });
      } else {
        this.endTimer();
      }
    }, this.props.duration);
    this.setState({ running: true });
  }

  endTimer() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.setState({ running: false, ran: true });
    }
  }

  resetTimer() {
    this.setState({ width: 100, running: false, ran: false });
  }
}

export default TimerBar;
