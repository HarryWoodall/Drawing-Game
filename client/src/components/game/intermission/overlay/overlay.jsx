import React, { Component } from "react";
import ReadyList from "./ready list/readyList";
import "./overlay.css";

class Overlay extends Component {
  render() {
    return (
      <div id="intermission-overlay">
        <ReadyList />
      </div>
    );
  }
}

export default Overlay;
