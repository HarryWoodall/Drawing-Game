import React, { Component } from "react";
import "./selectionButtons.css";

class SelectionButtons extends Component {
  render() {
    return (
      <div className="selection-buttons">
        <div className="selection-container">
          <input type="Button" value="Selection 1" />
          <input type="Button" value="Selection 2" />
          <input type="Button" value="Selection 3" />
        </div>
      </div>
    );
  }
}

export default SelectionButtons;
