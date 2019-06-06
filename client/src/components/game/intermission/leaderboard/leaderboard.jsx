import React, { Component } from "react";
import "./leaderboard.css";

class Leaderboard extends Component {
  render() {
    const sortedList = this.props.roomData.scoreData.sort((a, b) => {
      return a.score < b.score;
    });
    const listItems = sortedList.map((item, index) => (
      <li key={item.name} className={this.getClassName(index)}>
        <span className="leaderboard-name">
          <h2>{item.name}</h2>
        </span>
        <span className="leaderboard-score">
          <h2>{item.score}</h2>
        </span>
      </li>
    ));
    return <ul id="intermission-leaderboard">{listItems}</ul>;
  }

  getClassName(index) {
    switch (index) {
      case 0:
        return "pos-1";
      case 1:
        return "pos-2";
      case 2:
        return "pos-3";
      default:
        return null;
    }
  }
}

export default Leaderboard;
