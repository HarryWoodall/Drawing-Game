import React, { Component } from "react";
import posed from "react-pose";
import "./selectionButtons.css";

class SelectionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ["option 1", "option 2", "option 3"],
      answer: this.props.clientData.peerDrawing.suggestion,
      isVisible: true
    };

    fetch("/api/drawing/categories/random/2")
      .then(res => res.json())
      .then(data => {
        this.shuffleValues(data, this.props.clientData.peerDrawing.suggestion);
      });

    this.shuffleValues = this.shuffleValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.animationSetup = this.animationSetup.bind(this);
    this.animTest = this.animTest.bind(this);
  }

  render() {
    return (
      <div className="selection-buttons">
        <div className="selection-container">
          <input
            type="submit"
            value={this.state.options[0]}
            className="button selection-button"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            value={this.state.options[1]}
            className="button selection-button"
            onClick={this.handleSubmit}
          />
          <input
            type="submit"
            value={this.state.options[2]}
            className="button selection-button"
            onClick={this.handleSubmit}
          />
        </div>
        {this.animTest()}
      </div>
    );
  }

  shuffleValues(array, suggestion) {
    array.push(suggestion);
    let currentIndex = 3;
    let temporalValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporalValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporalValue;
    }

    this.setState({
      options: array
    });
  }

  handleSubmit(event) {
    this.props.clientData.guess = event.target.value;
    let data = {
      owner: this.props.clientData.peerDrawing.owner,
      ownerId: this.props.clientData.peerDrawing.ownerId,
      guess: event.target.value,
      answer: this.props.clientData.peerDrawing.suggestion
    };
    this.props.onSelection(data);
  }
}

export default SelectionButtons;
