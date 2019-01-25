import React, { Component } from "react";

class PrimaryButton extends Component {
  render() {
    return (
      <button className="PrimaryButton" onClick={this.props.handleClick}>
        {this.props.text}
      </button>
    );
  }
}

export default PrimaryButton;
