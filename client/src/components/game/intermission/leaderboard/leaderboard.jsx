import React, { Component } from "react";
import { Transition } from "react-spring/renderprops";
import "./leaderboard.css";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.listRefs = {};

    // Sort Data
    this.sortedList = this.sortList();

    this.state = {
      bonusesAdded: []
    };

    this.sortList = this.sortList.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    let currentIndex = 0;

    const myInterval = setInterval(() => {
      if (
        currentIndex ===
        this.props.roomData.scoreData.bonusPointData.length - 1
      ) {
        clearInterval(myInterval);
      }

      let currentBonuses = this.state.bonusesAdded;
      currentBonuses.push(
        this.props.roomData.scoreData.bonusPointData[currentIndex]
      );
      this.updateScore(
        this.props.roomData.scoreData.bonusPointData[currentIndex]
      );
      this.setState({ bonusesAdded: currentBonuses });
      currentIndex++;
    }, 1000);
  }

  render() {
    // Generate UI componenets
    const listItems = this.sortedList.map((item, index) => (
      <li key={item.name} className={this.getClassName(index)}>
        <span className="leaderboard-name">
          <h2 className="intermission-constant">{item.name}</h2>
        </span>
        <span className="leaderboard-score">
          <h2 className="intermission-constant">{item.score}</h2>
        </span>
        <span className="leaderboard-bonus">
          {this.state.bonusesAdded.includes(item.name) ? (
            <Transition
              items={this.bonusPointCount(item.name)}
              config={{ duration: 200 }}
              from={{ opacity: 0, fontSize: "500%" }}
              enter={{ opacity: 1, fontSize: "200%" }}
              leave={{ duration: 0, opacity: 0 }}
            >
              {item => props => (
                <h2 className="bonus-text" style={props}>
                  +{item}
                </h2>
              )}
            </Transition>
          ) : null}
        </span>
      </li>
    ));

    return <ul id="intermission-leaderboard">{listItems}</ul>;
  }

  sortList() {
    return this.props.roomData.scoreData.leaderboardData.sort((a, b) => {
      return a.score < b.score;
    });
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

  bonusPointCount(name) {
    let count = 0;

    for (let i = 0; i < this.state.bonusesAdded.length; i++) {
      if (this.state.bonusesAdded[i] === name) {
        count++;
      }
    }
    return count;
  }

  updateScore(name) {
    for (let i = 0; i < this.sortedList.length; i++) {
      if (this.sortedList[i].name === name) {
        this.sortedList[i].score++;

        if (this.props.clientData.userName === name) {
          this.props.clientData.score++;
          this.props.onScoreUpdate(false);
        }
      }
    }
    this.sortedList = this.sortList();
  }
}

export default Leaderboard;
