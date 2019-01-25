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
      phase: 0,
      suggestion: "none"
    };
    this.timer = 0;

    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    fetch("/api/drawing/categories/random/1")
      .then(res => res.json())
      .then(data =>
        this.setState(
          {
            suggestion: data[0]
          },
          () => {
            this.startTimer();
          }
        )
      );
  }

  render() {
    return (
      <div id="drawing-game-01" className="drinking-game">
        <P5Wrapper
          sketch={sketch}
          suggestion={this.state.suggestion}
          isComplete={this.state.isComplete}
          socket={this.state.socket}
        />
        <h1>{this.state.suggestion}</h1>
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

  startTimer() {
    if (this.timer === 0) {
      console.log("timer started");

      this.timer = setTimeout(() => {
        this.setState({ isComplete: true, phase: 1 });
      }, 5000);
    }
  }
}

export default DrawingGame01A;
