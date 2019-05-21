import React, { Component } from "react";
import P5Wrapper from "../../../../../node_modules/react-p5-wrapper";
import Canvas from "../../../p5Sketches/displayCanvas";
import "./viewingCanvas.css";

class ViewingCanvas extends Component {
  render() {
    return (
      <div className="viewing-canvas">
        <P5Wrapper
          sketch={Canvas}
          // suggestion={this.state.suggestion}
          // isDrawn={this.state.isDrawn}
          socket={this.props.socket}
          // otherDrawing={this.state.otherDrawing}
          // owner={this.props.userName}
        />
      </div>
    );
  }
}

export default ViewingCanvas;
