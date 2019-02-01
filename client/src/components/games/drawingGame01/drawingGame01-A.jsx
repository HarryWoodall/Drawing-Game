import React, { Component } from "react";
import "../../../App.css";
import "./drawingGame01.css";
import drawingCanvas from "../../p5Sketches/drawingCanvas";
import displayCanvas from "../../p5Sketches/displayCanvas";
import P5Wrapper from "react-p5-wrapper";
import PrimaryButton from "../../partial/primaryButton";
import SelectionButtons from "../../partial/selectionButtons";
import TimerBar from "../../partial/timerBar";

class DrawingGame01A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDrawing: false,
      isDrawn: false,
      phase: 0,
      isDrawingReady: false,
      suggestion: null
    };

    this.getMainText = this.getMainText.bind(this);
    this.getFeedbackText = this.getFeedbackText.bind(this);
    this.getButtons = this.getButtons.bind(this);
    this.getSuggestion = this.getSuggestion.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.handleSelectionClick = this.handleSelectionClick.bind(this);
    this.handleReadyClick = this.handleReadyClick.bind(this);
    this.getValues = this.getValues.bind(this);

    this.props.socket.on("DRAWINGS_READY", data => {
      this.setState({
        isDrawingReady: true
      });
      this.props.socket.emit("REQUEST_OTHER_DRAWING");
    });

    this.props.socket.on("OTHER_DRAWING", data => {
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
      this.setState({
        gameComplete: true
      });
    });

    this.props.socket.on("ROOM_READY_FOR_RESET", data => {
      this.resetGame();
    });
  }

  componentDidMount() {
    this.getSuggestion();
  }

  render() {
    return (
      <div id="drawing-game-01" className="drinking-game">
        <div
          id="canvas-wrapper"
          style={{ marginTop: this.state.isDrawingReady ? "10px" : "20px" }}
        >
          <P5Wrapper
            sketch={this.state.isDrawingReady ? displayCanvas : drawingCanvas}
            suggestion={this.state.suggestion}
            isDrawn={this.state.isDrawn}
            socket={this.props.socket}
            otherDrawing={this.state.otherDrawing}
            owner={this.props.userName}
          />
        </div>
        <div id="timer-wrapper">
          <TimerBar
            enable={this.state.newDrawing}
            duration={5}
            reset={this.state.phase === 0}
          />
        </div>
        <h1 id="drawing-game-01-main-header">{this.getMainText()}</h1>
        <h2
          id="feedback-text"
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
    if (this.state.phase === 1 && this.state.options) {
      return (
        <SelectionButtons
          values={this.state.options}
          amount={3}
          shuffled={true}
          handleClick={this.handleSelectionClick}
        />
      );
    } else if (this.state.gameComplete) {
      return <PrimaryButton text="Ready" handleClick={this.handleReadyClick} />;
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
              this.setState({ newDrawing: true }, () => {
                this.setState({ newDrawing: false });
              });
              setTimeout(() => {
                if (!this.state.isDrawn) {
                  this.setState({ isDrawing: false, isDrawn: true, phase: 1 });
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
        isDrawing: false,
        isDrawn: false,
        phase: 0,
        isDrawingReady: false,
        suggestion: null,

        options: null,
        guess: null,
        otherDrawing: null,
        peer: null,
        peerGuess: null,
        otherDrawingAnswer: null,
        gameComplete: false
      },
      () => {
        this.getSuggestion();
      }
    );
  }

  handleSelectionClick(e) {
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

  handleReadyClick() {
    this.props.socket.emit("USER_READY");
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
