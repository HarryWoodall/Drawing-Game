import React, { Component } from "react";
import "./lobbyUserList.css";
import { ReactComponent as Crown } from "./images/crown-solid.svg";

class LobbyUserList extends Component {
  render() {
    return <ul className="user-list">{this.generateList()}</ul>;
  }

  generateList() {
    return this.props.roomData.roomUsers.map(item => (
      <li key={item} className={this.applyClass(item)}>
        {this.props.roomData.roomLeader === item ? (
          <Crown className="leaders-crown" height={25} />
        ) : null}
        {item}
      </li>
    ));
  }

  applyClass(user) {
    let className = "user-item";
    if (this.props.roomData.roomLeader === user) {
      className += " leader";
    }
    if (this.props.clientData.userName === user) {
      className += " current-user";
    }
    return className;
  }
}

export default LobbyUserList;
