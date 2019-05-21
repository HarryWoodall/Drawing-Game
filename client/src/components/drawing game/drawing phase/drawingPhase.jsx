import React, { Component } from "react";
import DrawingArea from "./drawing area/drawingArea";
import TimerBar from "./timer bar/timerBar";
import Suggestion from "./suggestion/suggestion";

class DrawingPhase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: "COUNTDOWN"
    };
    this.handleCountdownCompletion = this.handleCountdownCompletion.bind(
      this
    );
    this.handleDrawingCompletion = this.handleDrawingCompletion.bind(
      this
    );

    console.log("props", this.props);
  }
  render() {
    return (
      <React.Fragment>
        <DrawingArea
          socket={this.props.socket}
          countdownComplete={this.handleCountdownCompletion}
        />
        {this.state.phase === "DRAWING" ? (
          <TimerBar
            time={2}
            timeOut={this.handleDrawingCompletion}
          />
        ) : (
          undefined
        )}
        <Suggestion />
      </React.Fragment>
    );
  }

  handleCountdownCompletion() {
    this.setState({
      phase: "DRAWING"
    });
  }

  handleDrawingCompletion() {
    this.setState({
      phase: "COMPLETE"
    });
    this.props.drawingCompletion();
  }
}

export default DrawingPhase;
