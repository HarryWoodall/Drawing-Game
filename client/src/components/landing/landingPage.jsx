import React, { Component } from "react";
import PrimaryButton from "../partial/primaryButton";
import "./landingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoom: false
    };

    this.textChangeHandle = this.textChangeHandle.bind(this);
    this.toggleHandle = this.toggleHandle.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
  }

  render() {
    return (
      <main id="landing-page">
        <h1 id="landing-page-main-header">Happy Hour</h1>
        <form id="setup-form" className="setup-item" autoComplete="off">
          <div id="setup-text-input">
            <div>
              <input
                type="text"
                id="user-name-input"
                className="setup-text-input text-input"
                placeholder="USER NAME"
                onChange={this.textChangeHandle}
              />
            </div>

            <div>
              <input
                type="text"
                id="room-name-input"
                className="setup-text-input text-input"
                style={{
                  visibility: +this.state.newRoom ? "hidden" : "visible"
                }}
                placeholder="ROOM NAME"
                onChange={this.textChangeHandle}
              />
            </div>
          </div>

          <div
            id="landing-login-error-text"
            style={{
              visibility: this.state.errorMessage ? "visible" : "hidden"
            }}
          >
            <h4 id="landing-page-errors">
              {this.state.errorMessage
                ? this.state.errorMessage
                : "errorMessage"}
            </h4>
          </div>

          <div id="toggle-buttons">
            <input
              type="button"
              id="new-room-button"
              className="toggle-button toggle-left"
              value="New Room"
              disabled={this.state.newRoom}
              onClick={this.toggleHandle}
            />
            <input
              type="button"
              id="enter-room-button"
              className="toggle-button toggle-right"
              value="Enter Room"
              disabled={!this.state.newRoom}
              onClick={this.toggleHandle}
            />
          </div>

          <div id="landing-page-submit-button">
            <PrimaryButton
              id="sumbit-button"
              text="Enter"
              handleClick={this.submitHandle}
            />
          </div>
        </form>
      </main>
    );
  }

  textChangeHandle(event) {
    if (event.target.id === "user-name-input") {
      this.setState({
        userName: event.target.value
      });
    } else if (event.target.id === "room-name-input") {
      this.setState({
        roomName: event.target.value.toUpperCase()
      });
    }
  }

  toggleHandle() {
    this.setState({
      newRoom: !this.state.newRoom
    });
  }

  submitHandle() {
    let xhr = new XMLHttpRequest();
    let url = "/";
    let props = this.props;
    let landingPage = this;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
        if (json.success) {
          props.handleSubmit();
        } else {
          landingPage.setState({ errorMessage: json.error });
        }
      }
    };
    let data = {
      newRoom: this.state.newRoom,
      roomName: this.state.roomName,
      userName: this.state.userName
    };
    xhr.send(JSON.stringify(data));
  }
}

export default LandingPage;
