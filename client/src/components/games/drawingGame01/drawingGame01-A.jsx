import React, { Component } from "react";
import "../../../App.css";
import sketch from "../../p5Sketches/drawingCanvas";
import P5Wrapper from "react-p5-wrapper";
import PrimaryButton from "../../partial/primaryButton";
import SelectionButtons from "../../partial/selectionButtons";

class DrawingGame01A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      socket: this.props.socket,
      phase: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div id="drawing-game-01" className="drinking-game">
        <P5Wrapper
          sketch={sketch}
          isComplete={this.state.isComplete}
          socket={this.state.socket}
        />
        {this.state.phase === 0 ? (
          <PrimaryButton text="Submit" handleClick={this.handleClick} />
        ) : (
          <SelectionButtons />
        )}
      </div>
    );
  }

  handleClick() {
    this.setState({ isComplete: true, phase: 1 });
  }
}

export default DrawingGame01A;
