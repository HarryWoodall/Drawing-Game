import React, { Component } from "react";
import ViewingCanvas from "./viewing canvas/viewingCanvas";
import GuessingArea from "./guess area/guessArea";

class GuessingPhase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peerDrawingData: null
    };
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);

    this.props.socket.on("DRAWINGS_READY", () => {
      this.props.socket.emit("REQUEST_PEER_DRAWING");
    });

    this.props.socket.on("PEER_DRAWING", data => {
      this.props.clientData.peerDrawing = data;
      this.setState({
        peerDrawingData: data
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <ViewingCanvas
          socket={this.props.socket}
          clientData={this.props.clientData}
        />
        <GuessingArea
          clientData={this.props.clientData}
          socket={this.props.socket}
          onScoreUpdate={this.handleScoreUpdate}
        />
      </React.Fragment>
    );
  }

  handleScoreUpdate() {
    this.props.onScoreUpdate();
  }
}

export default GuessingPhase;
