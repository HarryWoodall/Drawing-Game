import React, { Component } from "react";
import "../../../App.css";
import "./drawingGame01.css";
import drawingCanvas from "../../p5Sketches/drawingCanvas";
import displayCanvas from "../../p5Sketches/displayCanvas";
import P5Wrapper from "react-p5-wrapper";
import PrimaryButton from "../../partial/primaryButton";
import SelectionButtons from "../../partial/selectionButtons";
import TimerBar from "../../partial/timerBar";
import Countdown from "../../partial/countdown/countdown";
import ReadyTable from "../../partial/readyTable/readyTable";

class DrawingGame01A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDrawing: false,
      isDrawn: false,
      phase: "COUNTDOWN",
      isDrawingReady: false,
      suggestion: null,
      isReadyForNextGame: false,
      score: 0
    };

    this.countdownDuration = 4;
    this.drawingDuration = 5;
    this.countdownTimer = null;
    this.drawingTimer = null;

    /* 
      Phase 0 -- COUNTDOWN
      Phase 1 -- DRAWING
      Phase 2 -- GUESSING
      Phase 3 -- FEEDBACK
    */

    this.getMainText = this.getMainText.bind(this);
    this.getFeedbackText = this.getFeedbackText.bind(this);
    this.getFeedbackClass = this.getFeedbackClass.bind(this);
    this.getButtons = this.getButtons.bind(this);
    this.getSuggestion = this.getSuggestion.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.startDrawing = this.startDrawing.bind(this);
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
      this.setState({
        peer: data.owner,
        peerGuess: data.guess,
        phase: this.state.phase === "GUESSING" ? "GUESSING" : "FEEDBACK",
        score:
          data.guess === this.state.suggestion
            ? this.state.score + 1
            : this.state.score
      });
    });

    this.props.socket.on("GAME_COMPLETE", data => {
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
        {this.state.phase === "COUNTDOWN" ? (
          <Countdown
            content={["3", "2", "1", "DRAW"]}
            duration={this.countdownDuration}
            enable={true}
          />
        ) : (
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
        )}
        <div
          id="timer-wrapper"
          style={{
            visibility: this.state.phase === "DRAWING" ? "visible" : "hidden"
          }}
        >
          <TimerBar
            enable={this.state.newDrawing}
            duration={5}
            reset={this.state.phase === "DRAWING"}
          />
        </div>
        <h1 id="drawing-game-01-main-header">{this.getMainText()}</h1>
        <h3
          id="feedback-text"
          className={this.getFeedbackClass()}
          style={{
            visibility:
              this.state.phase === "GUESSING" || this.state.phase === "FEEDBACK"
                ? "visible"
                : "hidden"
          }}
        >
          {this.getFeedbackText()}
        </h3>
        {this.getButtons()}
        {/* <ReadyTable socket={this.props.socket} /> */}
        <div id="user-score">
          <h2>{this.state.score}</h2>
        </div>
      </div>
    );
  }

  getMainText() {
    switch (this.state.phase) {
      case "COUNTDOWN":
      case "DRAWING":
        return this.state.suggestion;
      case "GUESSING":
        return "What is it?";
      case "FEEDBACK":
        if (this.state.otherDrawingAnswer === this.state.guess) {
          return (
            <div id="main-feedback">
              <h2 class="main-feedback-correct-answer">Correct! </h2>
              <span class="main-feedback-owner">
                {this.state.otherDrawing.ownerName}
              </span>{" "}
              drew a{" "}
              <span class="main-feedback-answer">
                {this.state.otherDrawingAnswer}
              </span>
            </div>
          );
        } else {
          return (
            <div id="main-feedback">
              <h2 class="main-feedback-incorrect-answer">Incorrect!</h2>
              <span class="main-feedback-owner">
                {this.state.otherDrawing.ownerName}
              </span>{" "}
              drew a{" "}
              <span class="main-feedback-answer">
                {this.state.otherDrawingAnswer}
              </span>
              {", "}
              not a <span class="main-feedback-guess">{this.state.guess}</span>
            </div>
          );
        }
      default:
        return null;
    }
  }

  getFeedbackText() {
    if (this.state.peerGuess) {
      return this.state.peer + " thought your drew a " + this.state.peerGuess;
    } else {
      return "Awaiting feedback...";
    }
  }

  getFeedbackClass() {
    if (this.state.peerGuess) {
      if (this.state.peerGuess === this.state.suggestion) {
        return "feedback-is-true";
      } else {
        return "feedback-is-false";
      }
    } else {
      return "feedback-not-given";
    }
  }

  getButtons() {
    if (this.state.phase === "GUESSING" && this.state.options) {
      return (
        <SelectionButtons
          values={this.state.options}
          amount={3}
          shuffled={true}
          handleClick={this.handleSelectionClick}
        />
      );
    } else if (this.state.gameComplete) {
      return (
        <PrimaryButton
          text="Ready"
          handleClick={this.handleReadyClick}
          id={"ready" + this.state.isReadyForNextGame}
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
              this.startCountdown();
            }
          )
        );
    }
  }

  startCountdown() {
    if (this.state.phase === "COUNTDOWN") {
      this.countdownTimer = setTimeout(() => {
        this.setState(
          {
            phase: "DRAWING"
          },
          () => {
            this.setState({ newDrawing: true }, () => {
              this.setState({ newDrawing: false });
            });
            this.startDrawing();
          }
        );
      }, this.countdownDuration * 1000);
    }
  }

  startDrawing() {
    if (this.state.phase === "DRAWING") {
      this.drawingTimer = setTimeout(() => {
        if (!this.state.isDrawn) {
          this.setState({
            isDrawing: false,
            isDrawn: true,
            phase: "GUESSING"
          });
        }
      }, this.drawingDuration * 1000);
    }
  }

  resetGame() {
    this.setState(
      {
        isDrawing: false,
        isDrawn: false,
        phase: "COUNTDOWN",
        isDrawingReady: false,
        suggestion: null,
        isReadyForNextGame: false,

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
        phase: "FEEDBACK",
        guess: e.target.value,
        score:
          e.target.value === this.state.otherDrawingAnswer
            ? this.state.score + 1
            : this.state.score
      },
      () => {
        this.props.socket.emit("GUESS_SUBMISSION", data);
      }
    );
  }

  handleReadyClick() {
    this.setState(
      { isReadyForNextGame: !this.state.isReadyForNextGame },
      () => {
        this.props.socket.emit("USER_READY", this.state.isReadyForNextGame);
      }
    );
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
