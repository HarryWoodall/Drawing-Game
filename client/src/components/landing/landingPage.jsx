import React, { Component } from "react";

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
      <main>
        <h1>Happy Hour</h1>
        <form id="setup-form" className="setup-item">
          <div>
            <input
              type="text"
              id="user-name-input"
              className="setup-text-input"
              placeholder="User Name"
              onChange={this.textChangeHandle}
            />
          </div>

          <div>
            <input
              type="text"
              id="room-name-input"
              className="setup-text-input"
              style={{ visibility: +this.state.newRoom ? "hidden" : "visible" }}
              placeholder="Room Name"
              onChange={this.textChangeHandle}
            />
          </div>

          <input
            type="button"
            id="new-room-button"
            value="New Room"
            disabled={this.state.newRoom}
            onClick={this.toggleHandle}
          />
          <input
            type="button"
            id="enter-room-button"
            value="Enter Room"
            disabled={!this.state.newRoom}
            onClick={this.toggleHandle}
          />
          <div>
            <input
              type="button"
              id="submit-button"
              value="submit"
              onClick={this.submitHandle}
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
        roomName: event.target.value
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
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
        if (json.success) {
          props.handleSubmit();
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
