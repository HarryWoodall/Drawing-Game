import React, { Component } from "react";
import "./readyButton.css";

class ReadyButton extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };

    this.handleReadyToggle = this.handleReadyToggle.bind(this);
  }
  render() {
    let className = "button";
    if (this.state.isReady) {
      className += " ready";
    }

    return (
      <div className="ready-button">
        <input
          type="button"
          value="Ready"
          className={className}
          onClick={this.handleReadyToggle}
        />
      </div>
    );
  }

  handleReadyToggle() {
    this.setState({ isReady: !this.state.isReady }, () => {
      this.props.onReady(this.state.isReady);
      this.props.socket.emit("USER_READY", this.state.isReady);
    });
  }
}

export default ReadyButton;
