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
      suggestion: null
    };

    this.getMainText = this.getMainText.bind(this);
    this.getFeedbackText = this.getFeedbackText.bind(this);
    this.getButtons = this.getButtons.bind(this);
    this.getSuggestion = this.getSuggestion.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleSelectionClick = this.handleSelectionClick.bind(this);
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
        otherDrawingAnswer: data.suggestion
      });
      this.getValues(data.suggestion);
    });

    this.props.socket.on("RETURN_ANSWER", data => {
      console.log("Is correct?", data);
      this.setState({
        peer: data.owner,
        peerGuess: data.guess,
        phase: this.state.phase === 1 ? 1 : 2
      });
    });

    this.props.socket.on("GAME_COMPLETE", data => {
      console.log("game end timer stated");

      setTimeout(() => {
        this.resetGame();
      }, 10000);
    });
  }

  componentDidMount() {
    this.getSuggestion();
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
          owner={this.props.userName}
        />
        <h1>{this.getMainText()}</h1>
        <h2
          style={{ visibility: +this.state.phase === 0 ? "hidden" : "visible" }}
        >
          {this.getFeedbackText()}
        </h2>
        {this.getButtons()}
      </div>
    );
  }

  getMainText() {
    switch (this.state.phase) {
      case 0:
        return this.state.suggestion;
      case 1:
        return "What is it?";
      case 2:
        if (this.state.otherDrawingAnswer === this.state.guess) {
          return (
            "Correct!, " +
            this.state.otherDrawing.ownerName +
            " did in fact draw a " +
            this.state.otherDrawingAnswer
          );
        } else {
          return (
            "Incorrect! " +
            this.state.otherDrawing.ownerName +
            " drew a " +
            this.state.otherDrawingAnswer +
            " and not a " +
            this.state.guess
          );
        }
      default:
        return null;
    }
  }

  getFeedbackText() {
    if (this.state.peerGuess) {
      if (this.state.peerGuess === this.state.suggestion) {
        return (
          this.state.peer +
          " guessed correctly that your drawing was a " +
          this.state.peerGuess
        );
      } else {
        return (
          this.state.peer +
          " unfortunatly thought your drawing was a  " +
          this.state.peerGuess
        );
      }
    } else {
      return "Awaiting feedback...";
    }
  }

  getButtons() {
    if (this.state.phase === 0) {
      return (
        <PrimaryButton text="Submit" handleClick={this.handleSubmitClick} />
      );
    } else if (this.state.phase === 1 && this.state.options) {
      return (
        <SelectionButtons
          values={this.state.options}
          amount={3}
          shuffled={true}
          handleClick={this.handleSelectionClick}
        />
      );
    }
  }

  getSuggestion() {
    if (this.state.suggestion == null) {
      fetch("/api/drawing/categories/random/1")
        .then(res => res.json())
        .then(data =>
          this.setState(
            {
              suggestion: data[0]
            },
            () => {
              setTimeout(() => {
                if (!this.state.isComplete) {
                  this.setState({ isComplete: true, phase: 1 });
                }
              }, 5000);
            }
          )
        );
    }
  }

  resetGame() {
    this.setState(
      {
        isComplete: false,
        phase: 0,
        isDrawingReady: false,
        suggestion: null,

        options: null,
        guess: null,
        otherDrawing: null,
        peer: null,
        peerGuess: null,
        otherDrawingAnswer: null
      },
      () => {
        this.getSuggestion();
      }
    );
  }

  handleSubmitClick() {
    this.setState({ isComplete: true, phase: 1 });
  }

  handleSelectionClick(e) {
    console.log(
      e.target.value === this.state.otherDrawingAnswer,
      this.state.otherDrawingAnswer
    );
    let data = {
      owner: this.state.otherDrawing.owner,
      guess: e.target.value,
      answer: this.state.otherDrawingAnswer
    };
    this.setState(
      {
        phase: 2,
        guess: e.target.value
      },
      () => {
        this.props.socket.emit("GUESS_SUBMISSION", data);
      }
    );
  }

  //TODO debug this
  startTimer() {
    if (this.timer === 0) {
      console.log("timer started");

      this.timer = setTimeout(() => {
        if (!this.state.isComplete) {
          this.setState({ isComplete: true, phase: 1 });
        }
      }, 5000);
    }
  }

  getValues(answer) {
    if (this.state.options == null) {
      let values = [];
      values.push(answer);

      fetch("/api/drawing/categories/random/2")
        .then(res => res.json())
        .then(data => {
          for (let i = 0; i < 2; i++) {
            values.push(data[i]);
          }
          this.setState({
            options: values
          });
        });
    }
  }
}

export default DrawingGame01A;
