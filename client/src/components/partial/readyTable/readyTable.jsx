import React, { Component } from "react";
import "./readyTable.css";

class ReadyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersReady: [],
      listItems: [],
      currentindex: -1
    };

    this.listItems = [];

    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);

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

  render() {
    return (
      <ul
        id="ready-table"
        style={{ height: window.innerHeight * 0.4 }}
        class="fade"
      >
        {this.state.usersReady.map((user, index) => {
          return (
            <li key={user} className="ready-user" ref={this.listItems[index]}>
              {user}
            </li>
          );
        })}
      </ul>
    );
  }

  addUser(item) {
    var joined = this.state.usersReady.concat(item);
    this.listItems.push(React.createRef());

    this.setState({
      usersReady: joined,
      currentIndex: this.state.currentindex + 1
    });
  }

  removeUser(item) {
    let users = this.state.usersReady;
    for (let i = 0; i < users.length; i++) {
      if (users[i] === item) {
        this.listItems[0].current.classList.add("removing-item");
        users.splice(i, 1);
        this.listItems.splice(i, 1);

        setTimeout(() => {
          this.setState({
            usersReady: users,
            index: this.state.currentindex - 1
          });
        }, 200);
      }
    }
  }
}

export default ReadyTable;
