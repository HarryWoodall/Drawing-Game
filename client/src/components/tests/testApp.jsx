import React, { Component } from "react";
import DrawingCanvas from "../drawing game/drawing phase/drawing area/drawing canvas/drawingCanvas";
import Countdown from "../drawing game/drawing phase/drawing area/countdown/countdown";
import DrawingArea from "../drawing game/drawing phase/drawing area/drawingArea";
import TimerBar from "../drawing game/drawing phase/timer bar/timerBar";
import DrawingPhase from "../drawing game/drawing phase/drawingPhase";
import DrawingGame from "../drawing game/drawingGame";

class testApp extends Component {
  render() {
    switch (this.props.testName) {
      case "DRAWING_GAME":
        return <DrawingGame socket={this.props.socket} />;
      case "DRAWING_CANVAS":
        return <DrawingCanvas socket={this.props.socket} />;
      case "COUNTDOWN":
        return <Countdown />;
      case "DRAWING_AREA":
        return <DrawingArea socket={this.props.socket} />;
      case "TIMER_BAR":
        return <TimerBar time={2} />;
      case "DRAWING_PHASE":
        return <DrawingPhase socket={this.props.socket} />;
      default:
        return <h1>Invalid Test</h1>;
    }
  }
}

export default testApp;
