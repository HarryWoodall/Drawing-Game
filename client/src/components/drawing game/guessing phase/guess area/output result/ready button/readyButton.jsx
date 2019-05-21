import React, { Component } from "react";
import "./readyButton.css";

class ReadyButton extends Component {
  render() {
    return (
      <div className="ready-button">
        <input type="button" value="Ready" />
      </div>
    );
  }
}

export default ReadyButton;
