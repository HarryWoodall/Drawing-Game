import React, { Component } from "react";
import "./leaderboard.css";

class Leaderboard extends Component {
  render() {
    const sortedList = this.props.roomData.scoreData.sort((a, b) => {
      return a.score < b.score;
    });
    const listItems = sortedList.map(item => (
      <li key={item.name}>
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
}

export default Leaderboard;
