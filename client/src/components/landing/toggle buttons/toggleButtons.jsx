import React, { Component } from "react";
import "./toggleButtons.css";

class ToggleButtons extends Component {
  constructor() {
    super();
    this.state = {
      newRoom: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  render() {
    return (
      <div id="landing-toggle-buttons">
        <input
          type="button"
          className="toggle-left toggle-button"
          id="login-left-toggle-button"
          value="New Room"
          onClick={this.handleButtonClick}
          disabled={this.state.newRoom}
        />
        <input
          type="button"
          className="toggle-right toggle-button"
          id="login-right-toggle-button"
          value="Enter Room"
          onClick={this.handleButtonClick}
          disabled={!this.state.newRoom}
        />
      </div>
    );
  }

  handleButtonClick(event) {
    if (event.target.id === "login-left-toggle-button") {
      this.setState({
        newRoom: true
      });
      this.props.onToggle(true);
    } else {
      this.setState({
        newRoom: false
      });
      this.props.onToggle(false);
    }
  }
}

export default ToggleButtons;
