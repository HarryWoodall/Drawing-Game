import React, { Component } from "react";
import "./readyList.css";

class ReadyList extends Component {
  constructor() {
    super();
    this.state = {
      readyList: ["Frank", "Paul", "Bobby"]
    };
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
