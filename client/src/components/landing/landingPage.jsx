import React, { Component } from "react";
import TextInput from "./text input/textInput";
import ToggleButtons from "./toggle buttons/toggleButtons";
import ClientData from "../../data/clientData";
import "./landingPage.css";
import RoomData from "../../data/roomData";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoom: false,
      errorMessage: null
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  render() {
    return (
      <div>
        <h1 id="landing-page-header">Generic Mobile App Game</h1>
        <form autoComplete="off">
          <TextInput
            onTextChange={this.handleTextChange}
            newRoom={this.state.newRoom}
          />
          {this.state.errorMessage !== null ? (
            <h3 id="landing-error-message">{this.state.errorMessage}</h3>
          ) : null}
          <ToggleButtons onToggle={this.handleToggle} />
          <input
            type="button"
            value="Enter"
            onClick={this.handleSubmit}
            id="landing-submit-button"
            className="button"
          />
        </form>
      </div>
    );
  }

  handleTextChange(userName, roomName) {
    if (this.state.newRoom) {
      this.setState({
        userName: userName
      });
    } else {
      this.setState({
        userName: userName,
        roomName: roomName
      });
    }
  }

  handleToggle(newRoom) {
    this.setState({
      newRoom: newRoom
    });
  }

  handleSubmit() {
    this.clientData = new ClientData(this.state.userName);
    if (this.state.newRoom) {
      this.sendData(this.state.userName, true, null);
    } else {
      this.sendData(this.state.userName, false, this.state.roomName);
    }
  }

  sendData(userName, isNewRoom, roomName) {
    fetch("/", {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        newRoom: isNewRoom,
        roomName: roomName,
        userName: userName
      }),
      method: "POST"
    }).then(response => {
      response.json().then(data => {
        console.log(data);

        if (data.success) {
          let users = [];
          for (let user of data.room.users) {
            users.push(user.name);
          }
          let roomData = new RoomData(data.room.name, data.room.leader, users);

          this.props.handleSubmit(this.clientData, roomData);
        } else {
          let message;
          switch (data.error) {
            case "ROOM_NOT_FOUND":
              message = "Invalid Room Name";
              break;
            case "USER_ALREADY_EXISTS":
              message = "User already exists (Try Refreshing Page)";
              break;
            case "USERNAME_TAKEN":
              message = "Username already Taken";
              break;
            default:
              message = "Unknown Error";
              break;
          }
          this.setState({ errorMessage: message });
        }
      });
    });
  }
}

export default LandingPage;
