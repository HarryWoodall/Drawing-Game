import React, { Component } from "react";
import "./suggestion.css";

class Suggestion extends Component {
  render() {
    return (
      <div
        className="suggestion"
        style={{ top: window.innerHeight * 0.8 + "px" }}
      >
        <h2>{this.props.clientData.suggestion}</h2>
      </div>
    );
  }
}

export default Suggestion;
