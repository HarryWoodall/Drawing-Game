import React, { Component } from "react";
import "../../../App.css";
import sketch from "../../p5Sketches/drawingGame01";
import P5Wrapper from "react-p5-wrapper";
import PrimaryButton from "../../partial/primaryButton";

class DrawingGame01 extends Component {
  constructor(props) {
    super();
    this.state = {
      isComplete: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div id="drawing-game-01" className="drinking-game">
        <P5Wrapper sketch={sketch} isComplete={this.state.isComplete} />
        <PrimaryButton text="Submit" handleClick={this.handleClick} />
      </div>
    );
  }

  handleClick() {
    this.setState({ isComplete: true });
  }
}

export default DrawingGame01;
