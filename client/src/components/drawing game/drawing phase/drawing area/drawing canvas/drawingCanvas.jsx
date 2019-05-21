import React, { Component } from "react";
import P5Wrapper from "../../../../../../node_modules/react-p5-wrapper";
import drawingCanvas from "../../../../p5Sketches/drawingCanvas";

class DrawingCanvas extends Component {
  render() {
    return (
      <P5Wrapper
        sketch={drawingCanvas}
        // suggestion={this.state.suggestion}
        // isDrawn={this.state.isDrawn}
        socket={this.props.socket}
        // otherDrawing={this.state.otherDrawing}
        // owner={this.props.userName}
      />
    );
  }
}

export default DrawingCanvas;
