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
    this.handleCountdownCompletion = this.handleCountdownCompletion.bind(this);
    this.handleDrawingCompletion = this.handleDrawingCompletion.bind(this);
    this.props.clientData.getSuggestion().then(() => this.forceUpdate());
  }
  render() {
    return (
      <React.Fragment>
        <DrawingArea
          socket={this.props.socket}
          countdownComplete={this.handleCountdownCompletion}
          isComplete={this.state.phase === "COMPLETE"}
          clientData={this.props.clientData}
        />
        {this.state.phase === "DRAWING" ? (
          <TimerBar time={3} timeOut={this.handleDrawingCompletion} />
        ) : null}
        <Suggestion clientData={this.props.clientData} />
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
