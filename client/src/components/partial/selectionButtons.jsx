import React, { Component } from "react";

class SelectionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values,
      shuffled: props.isShuffled
    };

    this.shuffleValues = this.shuffleValues.bind(this);
  }

  createButtons(amount, values) {
    let buttons = [];
    console.log("values", this.props.values);
    if (values) {
      if (this.props.shuffled) {
        this.shuffleValues();
      }
      for (let i = 0; i < this.props.amount; i++) {
        buttons.push(<input type="button" value={values[i]} key={"key" + i} />);
      }
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

  shuffleValues() {
    let currentIndex = this.props.values.length;
    let temporalValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporalValue = this.props.values[currentIndex];
      this.props.values[currentIndex] = this.props.values[randomIndex];
      this.props.values[randomIndex] = temporalValue;
    }
  }
}

export default SelectionButtons;
