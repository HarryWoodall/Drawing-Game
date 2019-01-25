import React, { Component } from "react";
import SingleList from "../partial/singleList";
import StartButton from "../partial/primaryButton";

class Lobby extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.submitHandle);

    this.state = {
      socket: props.socket
    };

    this.props.socket.on("INIT_LOBBY_DATA", data => {
      this.setState({
        userName: data.userName,
        roomName: data.roomName,
        users: data.users,
        isLeader: data.isLeader
      });
    });

    this.props.socket.on("ADDED_USER_TO_ROOM", data => {
      if (this.state.users) {
        let userList = this.state.users;
        userList.push(data.user);
        this.setState({
          users: userList
        });
      }
    });

    this.props.socket.on("REMOVED_USER_FROM_ROOM", data => {
      if (this.state.users) {
        let userList = this.state.users;
        for (let i = 0; i < userList.length; i++) {
          if (userList[i] === data.user) {
            userList.splice(i, 1);
          }
        }
        this.setState({
          users: userList
        });
      }
    });
  }

  componentDidMount() {
    console.log("component Mounted");

    this.state.socket.emit("INIT_LOBBY_REQ");
  }

  render() {
    return (
      <main>
        <h1>{this.state.roomName}</h1>
        <h3>lobby</h3>
        <div className="users-container">
          <h2>Users</h2>
          <SingleList items={this.state.users} />
        </div>
        {this.renderButton()}
      </main>
    );
  }

  renderButton() {
    if (this.state.isLeader) {
      return <StartButton text="Start" handleClick={this.props.submitHandle} />;
    }
  }
}

export default Lobby;
