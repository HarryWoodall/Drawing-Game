import React, { Component } from "react";
import "../../../App.css";
import drawingCanvas from "../../p5Sketches/drawingCanvas";
import displayCanvas from "../../p5Sketches/displayCanvas";
import P5Wrapper from "react-p5-wrapper";
import PrimaryButton from "../../partial/primaryButton";
import SelectionButtons from "../../partial/selectionButtons";

class DrawingGame01A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      phase: 0,
      isDrawingReady: false,
      suggestion: "none",
      answer: ""
    };
    this.timer = 0;

    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.getValues = this.getValues.bind(this);

    this.props.socket.on("DRAWINGS_READY", data => {
      this.setState({
        isDrawingReady: true
      });
      this.props.socket.emit("REQUEST_OTHER_DRAWING");
    });

    this.props.socket.on("OTHER_DRAWING", data => {
      console.log("other drawing recieved", data);

      this.setState({
        otherDrawing: data,
        answer: data.suggestion
      });

      this.getValues(data.suggestion);

      console.log("state", this.state);
    });
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
          sketch={this.state.isDrawingReady ? displayCanvas : drawingCanvas}
          suggestion={this.state.suggestion}
          isComplete={this.state.isComplete}
          socket={this.props.socket}
          otherDrawing={this.state.otherDrawing}
        />
        <h1>
          {this.state.phase === 0 ? this.state.suggestion : "What is it?"}
        </h1>
        {this.state.phase === 0 && !this.state.options ? (
          <PrimaryButton text="Submit" handleClick={this.handleClick} />
        ) : (
          <SelectionButtons
            values={this.state.options}
            amount={3}
            shuffled={true}
          />
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

  getValues(answer) {
    let values = [];
    values.push(answer);

    fetch("/api/drawing/categories/random/2")
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < 2; i++) {
          values.push(data[i]);
        }
        this.setState(
          {
            options: values
          },
          () => {
            console.log("state", this.state);
          }
        );
      });
  }
}

export default DrawingGame01A;
