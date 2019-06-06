import React, { Component } from "react";
import "./timerBar.css";

class TimerBar extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
      percent: 100.0
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.reset = this.reset.bind(this);

    this.timer = null;
    this.toggleTimer(true);
  }

  componentDidUpdate() {
    if (this.props.status === "START" && this.state.isActive === false) {
      this.toggleTimer(true);
      this.setState = {
        isActive: true
      };
    } else if (this.props.status === "PAUSE" && this.state.isActive === true) {
      this.toggleTimer(false);
      this.setState = {
        isActive: false
      };
    }
  }

  render() {
    return (
      <div
        style={{
          width: this.state.percent + "%"
          // top: window.innerHeight * 0.8 + "px"
        }}
        className="timer-bar"
      />
    );
  }

  toggleTimer(start) {
    if (start) {
      this.timer = setInterval(() => {
        if (this.state.percent >= 0) {
          this.setState({
            percent: this.state.percent - 1 / this.props.time
          });
        } else {
          clearInterval(this.timer);
          this.props.timeOut();
        }
      }, 10);
    } else {
      clearInterval(this.timer);
    }
  }

  reset() {
    clearInterval(this.timer);
    this.setState({
      isActive: false,
      percent: 100
    });
  }
}

export default TimerBar;
