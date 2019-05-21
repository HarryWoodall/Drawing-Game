import React, { Component } from "react";
import Game from "../game/game";
import DrawingCanvas from "../drawing game/drawing phase/drawing area/drawing canvas/drawingCanvas";
import Countdown from "../drawing game/drawing phase/drawing area/countdown/countdown";
import DrawingArea from "../drawing game/drawing phase/drawing area/drawingArea";
import TimerBar from "../drawing game/drawing phase/timer bar/timerBar";
import DrawingPhase from "../drawing game/drawing phase/drawingPhase";
import GuessingPhase from "../drawing game/guessing phase/guessingPhase";
import DrawingGame from "../drawing game/drawingGame";
import ViewingCanvas from "../drawing game/guessing phase/viewing canvas/viewingCanvas";
import InputGuess from "../drawing game/guessing phase/guess area/input guess/inputGuess";
import OutputResult from "../drawing game/guessing phase/guess area/output result/outputResult";

class testApp extends Component {
  render() {
    switch (this.props.testName) {
      case "GAME":
        return <Game socket={this.props.socket} />;
      case "DRAWING_GAME":
        return <DrawingGame socket={this.props.socket} />;
      case "DRAWING_CANVAS":
        return <DrawingCanvas socket={this.props.socket} />;
      case "VIEWING_CANVAS":
        return <ViewingCanvas socket={this.props.socket} />;
      case "COUNTDOWN":
        return <Countdown />;
      case "DRAWING_AREA":
        return <DrawingArea socket={this.props.socket} />;
      case "TIMER_BAR":
        return <TimerBar time={2} />;
      case "DRAWING_PHASE":
        return <DrawingPhase socket={this.props.socket} />;
      case "GUESSING_PHASE":
        return <GuessingPhase socket={this.props.socket} />;
      case "INPUT_GUESS":
        return <InputGuess />;
      case "OUTPUT_RESULT":
        return <OutputResult />;
      default:
        return <h1>Invalid Test</h1>;
    }
  }
}

export default testApp;
