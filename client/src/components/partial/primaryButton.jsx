import React, { Component } from "react";

class PrimaryButton extends Component {
  render() {
    return (
      <input
        type="button"
        value={this.props.text}
        className={
          "button primary-button" +
          (this.props.className ? " " + this.props.className : "")
        }
        id={this.props.id}
        onClick={this.props.handleClick}
      />
    );
  }
}

export default PrimaryButton;
