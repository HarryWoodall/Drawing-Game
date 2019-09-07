import React, { Component } from "react";
import P5Wrapper from "../../../../../../node_modules/react-p5-wrapper";
import Canvas from "../../../../p5Sketches/drawingCanvas";
import "./drawingCanvas.css";

class DrawingCanvas extends Component {
  constructor() {
    super();
    this.handleDrawingEnd = this.handleDrawingEnd.bind(this);
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

    // this.props.clientData.selfDrawing = data; // Possible redundant
    this.props.socket.emit("SEND_DRAWING", data);
    this.props.errors.drawingSentTimeout();
  }
}

export default DrawingCanvas;
