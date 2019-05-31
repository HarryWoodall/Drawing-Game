import React, { Component } from "react";
import "./textInput.css";

class TextInput extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      roomName: ""
    };
    // window.addEventListener("resize", this.handleFocus);

    this.handleTextChanged = this.handleTextChanged.bind(this);
    this.sendTextChange = this.sendTextChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  render() {
    if (this.props.newRoom) {
      return (
        <div className="landing-page-text-input">
          <input
            type="text"
            id="user-name-input"
            className="setup-text-input text-input"
            placeholder="USER NAME"
            onChange={this.handleTextChanged}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
      );
    } else {
      return (
        <div className="landing-page-text-input">
          <input
            type="text"
            id="user-name-input"
            className="setup-text-input text-input"
            placeholder="USER NAME"
            onChange={this.handleTextChanged}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          <input
            type="text"
            id="room-name-input"
            className="setup-text-input text-input"
            placeholder="ROOM NAME"
            onChange={this.handleTextChanged}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
      );
    }
  }

  handleTextChanged(event) {
    if (event.target.id === "user-name-input") {
      this.setState(
        {
          userName: event.target.value
        },
        () => {
          this.sendTextChange();
        }
      );
    } else if (event.target.id === "room-name-input") {
      this.setState(
        {
          roomName: event.target.value.toUpperCase()
        },
        () => {
          this.sendTextChange();
        }
      );
    }
  }

  handleFocus() {
    if (window.innerHeight < 500) {
      console.log("keyboard");
      this.props.isKeyboard(true);
    }
  }

  handleBlur() {
    if (window.innerHeight >= 500) {
      console.log("no keyboard");
      this.props.isKeyboard(false);
    }
  }

  sendTextChange() {
    this.props.onTextChange(this.state.userName, this.state.roomName);
  }
}

export default TextInput;
