import React, { Component } from "react";

class PrimaryButton extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <button className="PrimaryButton" onClick={this.props.handleClick}>
        {this.props.text}
      </button>
    );
  }
}

export default PrimaryButton;
