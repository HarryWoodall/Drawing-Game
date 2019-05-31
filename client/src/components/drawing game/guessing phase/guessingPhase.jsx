import React, { Component } from "react";
import ViewingCanvas from "./viewing canvas/viewingCanvas";
import GuessingArea from "./guess area/guessArea";
import Socket from "../../../sockets/socket";

class GuessingPhase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null
    };
  }

  componentWillMount() {
    this.setState({ socket: new Socket(this.props.socket) }, () => {
      this.state.socket.drawingsReady(() =>
        console.log("Requesting a new drawing")
      );

      this.state.socket.peerDrawing(data => {
        this.props.clientData.peerDrawing = data;
        this.forceUpdate();
      });
    });
  }

  componentWillUnmount() {
    this.setState({ socket: null });
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
          onScoreUpdate={this.props.onScoreUpdate}
        />
      </React.Fragment>
    );
  }
}

export default GuessingPhase;
