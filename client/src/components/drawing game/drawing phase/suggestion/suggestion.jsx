import React, { Component } from "react";
import "./suggestion.css";

class Suggestion extends Component {
  render() {
    return (
      <div className="suggestion">
        <h2>{this.props.clientData.suggestion}</h2>
      </div>
    );
  }
}

export default Suggestion;
