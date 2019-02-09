import React, { Component } from "react";
import ReadyTableItem from "./readyTableItem";
import "./readyTable.css";

class ReadyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersReady: [],
      usersBeingRemoved: [],
      listItems: [],
      lastActions: [],
      currentindex: -1
    };

    this.listItems = [];
    this.lastActions = [];

    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.handleItemDeath = this.handleItemDeath.bind(this);

    if (!this.props.test) {
      this.props.socket.on("READY_CHANGE", data => {
        console.log(data);

        if (data.ready) {
          this.addUser(data.user);
        } else {
          this.removeUser(data.user);
        }
      });

      this.props.socket.on("ROOM_READY_FOR_RESET", data => {
        this.setState({ usersReady: [] });
      });
    }
  }

  componentDidUpdate() {
    if (this.props.test) {
      if (this.props.modification.mod === "ADD") {
        this.addUser(this.props.modification.user);
      } else {
        this.removeUser(this.props.modification.user);
      }
    }
  }

  render() {
    return (
      <ul
        id="ready-table"
        style={{ height: window.innerHeight * 0.4 }}
        className="fade"
      >
        {this.state.usersReady.map((user, index) => {
          return (
            <ReadyTableItem
              content={user}
              key={user}
              className="ready-user "
              currentAction={this.state.lastActions[index]}
              onItemDeath={this.handleItemDeath}
            />
          );
        })}
      </ul>
    );
  }

  addUser(item) {
    if (!this.state.usersReady.includes(item)) {
      let joined = this.state.usersReady.concat(item);
      let actions = this.state.lastActions;
      let ref = React.createRef();
      this.listItems.push(ref);

      actions.push({ className: "add-user", time: 200 });
      //this.lastActions.push({ className: "add-user", time: 200 });

      this.setState({
        usersReady: joined,
        lastActions: actions,
        currentIndex: this.state.currentindex + 1
      });
    }
  }

  removeUser(item) {
    //console.log("removing user");

    if (!this.state.usersBeingRemoved.includes(item)) {
      let joined = this.state.usersBeingRemoved.concat(item);
      let users = this.state.usersReady;
      for (let i = 0; i < users.length; i++) {
        if (users[i] === item) {
          let actions = this.state.lastActions;
          actions[i] = { className: "removing-user", time: 200 };
          for (let j = i; j < actions.length; j++) {
            actions[j] = { className: "moving-up", time: 200 };
          }
          this.setState({
            usersBeingRemoved: joined,
            lastActions: actions
          });
        }
      }
    }
  }

  handleItemDeath(content) {
    let users = this.state.usersReady;

    for (let i = 0; i < users.length; i++) {
      if (users[i] === content) {
        console.log("removeing user from list");

        users.splice(i, 1);

        this.setState({
          usersReady: users
        });
      }
    }
  }
}

export default ReadyTable;
