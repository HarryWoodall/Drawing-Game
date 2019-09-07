import React, { Component } from "react";
import Socket from "../../sockets/socket";

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(this.props.socket)
    };

    this.state.socket.disconnect();
  }
  render() {
    return (
      <div>
        <h1>Something went wrong :(</h1>
        <h2>{this.props.error}</h2>
      </div>
    );
  }
}

export default ErrorPage;
