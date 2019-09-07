import React, { Component } from "react";
import Socket from "../../sockets/socket";
import "./errorPage.css";

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
        <h1 className="error-header" style={{ top: window.innerHeight * 0.1 }}>
          Something went wrong :(
        </h1>
        <h2 className="error-message" style={{ top: window.innerHeight * 0.3 }}>
          {this.props.error}
        </h2>
        <input
          type="button"
          className="button error-button"
          style={{ top: window.innerHeight * 0.7 }}
          value="Click to refresh"
        />
      </div>
    );
  }
}

export default ErrorPage;
