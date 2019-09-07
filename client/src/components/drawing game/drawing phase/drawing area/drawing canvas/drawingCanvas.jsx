import React, { Component } from "react";
import P5Wrapper from "../../../../../../node_modules/react-p5-wrapper";
import Canvas from "../../../../p5Sketches/drawingCanvas";
import MirrorOverlay from "./mod overlays/mirrorOverlay";
import "./drawingCanvas.css";

class DrawingCanvas extends Component {
  constructor() {
    super();
    this.handleDrawingEnd = this.handleDrawingEnd.bind(this);
    this.requiresOverlay = this.requiresOverlay.bind(this);
  }

  render() {
    return (
      <div
        className="drawing-canvas"
        style={{ top: window.innerHeight * 0.05 + "px" }}
      >
        <P5Wrapper
          sketch={Canvas}
          isComplete={this.props.isComplete}
          getDrawing={this.handleDrawingEnd}
          mods={this.props.clientData.currentMods}
        />
        {this.requiresOverlay() ? (
          <MirrorOverlay type={this.props.clientData.currentMods[0]} />
        ) : null}
      </div>
    );
  }

  handleDrawingEnd(dimentions, content) {
    let data = {
      suggestion: this.props.clientData.suggestion,
      dimentions: dimentions,
      content: content,
      owner: this.props.clientData.userName,
      ownerId: null
    };

    this.props.socket.emit("SEND_DRAWING", data);
    this.props.errors.drawingSentTimeout();
  }

  requiresOverlay() {
    const mirrorArray = ["MIRROR-H", "MIRROR-V", "MIRROR-B"];
    if (mirrorArray.includes(this.props.clientData.currentMods[0])) {
      return true;
    }
  }
}

export default DrawingCanvas;
