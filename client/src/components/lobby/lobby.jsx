import React, { Component } from "react";
import SingleList from "../partial/singleList";
import StartButton from "../partial/primaryButton";
import "./lobby.css";

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: props.socket,
      identifiers: ["room-leader", "current-user"]
    };

    this.applyClassName = this.applyClassName.bind(this);
    this.getExtra = this.getExtra.bind(this);
    this.setLeaderVisibility = this.setLeaderVisibility.bind(this);

    this.props.socket.connect();

    this.props.socket.on("INIT_LOBBY_DATA", data => {
      console.log("data", data);

      this.setState({
        userName: data.userName,
        roomName: data.roomName,
        users: data.users,
        leader: data.leader
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
    this.props.socket.connect();
    console.log("component Mounted");
    console.log(this.props.socket);

    this.props.socket.emit("INIT_LOBBY_REQ");
  }

  render() {
    return (
      <main>
        <h1 id="lobby-main-header">{this.state.roomName}</h1>
        <h3 id="lobby-sub-header">lobby</h3>
        <div
          className="users-container"
          style={{ height: window.innerHeight * 0.6 }}
        >
          <h2 id="lobby-users-header">Users</h2>
          <SingleList
            items={this.state.users}
            itemClass="user-item"
            applyAltClasses={this.applyClassName}
            extras={this.getExtra}
            applyExtraStyle={this.setLeaderVisibility}
          />
        </div>
        {this.renderButton()}
      </main>
    );
  }

  renderButton() {
    if (this.state.leader === this.state.userName) {
      return <StartButton text="Start" handleClick={this.props.submitHandle} />;
    }
  }

  applyClassName(item) {
    let className = "";
    if (item === this.state.leader) {
      className += " room-leader";
    }

    if (item === this.state.userName) {
      className += " current-user";
    }

    return className;
  }

  setLeaderVisibility(item) {
    if (item === this.state.leader) {
      return { visibility: "visible" };
    } else {
      return { visibility: "hidden" };
    }
  }

  getExtra(item) {
    return (
      <span className="leader-icon" style={this.setLeaderVisibility(item)}>
        ★
      </span>
    );
  }
}

export default Lobby;
