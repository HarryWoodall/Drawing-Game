import React, { Component } from "react";
import "./readyList.css";
import Socket from "../../../../../sockets/socket";

class ReadyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyList: [],
      socket: new Socket(this.props.socket)
    };

    this.state.socket.readyChange(data => {
      this.setState({ readyList: data });
    });
  }

  componentWillUnmount() {
    this.state.socket.disconnectReadyChange();
  }
  render() {
    const listItems = this.state.readyList.map(item => (
      <li key={item} className="ready-list-item">
        {item}
      </li>
    ));
    return <ul id="intermission-ready-list">{listItems}</ul>;
  }
}

export default ReadyList;
