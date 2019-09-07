import React, { Component } from "react";
import DrawingArea from "./drawing area/drawingArea";
import TimerBar from "./timer bar/timerBar";
import Suggestion from "./suggestion/suggestion";
import DebuffOverlay from "./debuff overlay/debuffOverlay";

class DrawingPhase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: "COUNTDOWN",
      debuffOverlayActive: true
    };
    this.handleCountdownCompletion = this.handleCountdownCompletion.bind(this);
    this.handleDrawingCompletion = this.handleDrawingCompletion.bind(this);
    this.props.clientData.getSuggestion().then(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.props.clientData.currentMods = [];
  }

  render() {
    return (
      <React.Fragment>
        <DrawingArea
          socket={this.props.socket}
          countdownComplete={this.handleCountdownCompletion}
          isComplete={this.state.phase === "COMPLETE"}
          clientData={this.props.clientData}
          settingsData={this.props.settingsData}
          errors={this.props.errors}
        />
        {this.state.phase === "DRAWING" ? (
          <TimerBar
            time={this.props.settingsData.roomSettings.drawTime}
            timeOut={this.handleDrawingCompletion}
          />
        ) : null}
        <Suggestion clientData={this.props.clientData} />
        {console.log(
          this.props.clientData.currentMods.length,
          "Current mods length"
        )}
        {this.props.clientData.currentMods.length > 0 &&
        this.state.debuffOverlayActive
          ? this.getDebuffOverlay()
          : null}
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

  getDebuffOverlay() {
    console.log("Applying debuff overlay");
    console.log("Overlay Applied", this.state.debuffOverlayApplied);

    let debuff;
    switch (
      this.props.clientData.currentMods[0] // Edit for multiple mods
    ) {
      case "INVISIBLE_INK":
        debuff = "Invisible Ink";
        break;
      case "OFFSET":
        debuff = "Offset";
        break;
      case "MIRROR-H":
      case "MIRROR-V":
      case "MIRROR-B":
        debuff = "Mirror";
        break;
      default:
        debuff = null;
    }

    setTimeout(() => {
      this.setState({
        debuffOverlayActive: false
      });
    }, 1500);
    return <DebuffOverlay debuff={debuff} />;
  }
}

export default DrawingPhase;
