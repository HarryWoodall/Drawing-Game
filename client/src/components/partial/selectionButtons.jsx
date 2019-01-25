import React, { Component } from "react";

class SelectionButtons extends Component {
  createButtons(amount, values) {
    let buttons = [];

    for (let i = 0; i < this.props.amount; i++) {
      buttons.push(
        <input type="button" value={this.props.values[i]} key={"key" + i} />
      );
    }

    return buttons;
  }

  render() {
    return (
      <div className="selection-buttons-container">
        {this.createButtons(this.props.amount, this.props.values)}
      </div>
    );
  }
}

SelectionButtons.defaultProps = {
  amount: 3,
  values: ["button 1", "button 2", "button 3"]
};

export default SelectionButtons;
