import React, { Component } from "react";
import { Transition } from "react-spring/renderprops";
import "./leaderboard.css";
import Socket from "../../../../sockets/socket";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.listRefs = {};

    // Sort Data
    this.sortedList = this.sortList();

    this.state = {
      socket: new Socket(this.props.socket),
      selectAvailable: false,
      bonusesAdded: []
    };

    if (this.props.roomData.scoreData.bonusPointData) {
      for (let name of this.props.roomData.scoreData.bonusPointData) {
        this.updateServerScore(name);
      }
    }

    if (
      this.props.settingsData.roomSettings.debuffsActive &&
      this.props.clientData.userName === this.props.roomData.roomLeader
    ) {
      this.state.socket.readyForDebuffs(this.props.roomData.roundCount);
    }

    this.bonusTimer = null;
    this.nextBonusDelay = 750;

    this.sortList = this.sortList.bind(this);
    this.updateUIScore = this.updateUIScore.bind(this);
    this.updateServerScore = this.updateServerScore.bind(this);
    this.getFontSize = this.getFontSize.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.bonusPointCompletion = this.bonusPointCompletion.bind(this);
  }

  componentDidMount() {
    let currentIndex = 0;

    if (this.props.roomData.scoreData.bonusPointData) {
      this.bonusTimer = setInterval(() => {
        if (
          currentIndex ===
            this.props.roomData.scoreData.bonusPointData.length - 1 ||
          this.props.roomData.scoreData.bonusPointData.length === 0
        ) {
          clearInterval(this.bonusTimer);
          this.bonusPointCompletion();
        }

        let currentBonuses = this.state.bonusesAdded;
        currentBonuses.push(
          this.props.roomData.scoreData.bonusPointData[currentIndex]
        );
        this.updateUIScore(
          this.props.roomData.scoreData.bonusPointData[currentIndex]
        );
        this.setState({ bonusesAdded: currentBonuses });
        currentIndex++;
      }, this.nextBonusDelay);
    } else {
      this.bonusPointCompletion();
    }
  }

  componentWillUnmount() {
    clearInterval(this.bonusTimer);
  }

  render() {
    // Generate UI componenets
    const listItems = this.sortedList.map((item, index) => (
      <li
        key={item.name}
        className={this.getClassName(index, item.name)}
        id={item.name}
        onClick={this.handleSelection}
      >
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
              from={{ opacity: 0, fontSize: this.getFontSize("FROM") }}
              enter={{ opacity: 1, fontSize: this.getFontSize("ENTER") }}
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

    return (
      <ul
        id="intermission-leaderboard"
        style={{ top: window.innerHeight * 0.1 }}
      >
        {listItems}
      </ul>
    );
  }

  sortList() {
    return this.props.roomData.scoreData.leaderboardData.sort((a, b) => {
      return a.score < b.score;
    });
  }

  getClassName(index, name) {
    let className = "";
    switch (index) {
      case 0:
        className += "pos-1";
        break;
      case 1:
        className += "pos-2";
        break;
      case 2:
        className += "pos-3";
        break;
      default:
        break;
    }

    if (this.state.selectAvailable && name !== this.props.clientData.userName) {
      className += " item-selectable";
    }

    if (this.state.currentSelection === name) {
      className += " item-selected";
    }

    return className;
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

  bonusPointCompletion() {
    setTimeout(() => {
      if (this.props.clientData.debuffSelectionAvailable) {
        this.setState({ selectAvailable: true });
      }

      this.props.onBonusComplete();
    }, this.nextBonusDelay);
  }

  getFontSize(phase) {
    if (phase === "FROM") {
      if (window.innerWidth < 400) {
        return "175%";
      }

      if (window.innerWidth < 700) {
        return "200%";
      }

      return "500%";
    } else {
      if (window.innerWidth < 400) {
        return "50%";
      }

      if (window.innerWidth < 700) {
        return "75%";
      }

      return "100%";
    }
  }

  updateUIScore(name) {
    for (let i = 0; i < this.sortedList.length; i++) {
      if (this.sortedList[i].name === name) {
        this.sortedList[i].score++;
      }
    }
    this.sortedList = this.sortList();
  }

  updateServerScore(name) {
    if (this.props.clientData.userName === name) {
      this.props.clientData.score++;
      this.props.onScoreUpdate(false);
    }
  }

  handleSelection(e) {
    this.props.onDebuffSelection(e.currentTarget.id);
    if (
      this.state.selectAvailable &&
      e.currentTarget.id !== this.props.clientData.userName
    ) {
      if (this.state.currentSelection === e.currentTarget.id) {
        this.setState({ currentSelection: null });
      } else {
        this.setState({ currentSelection: e.currentTarget.id });
      }
    }
  }
}

export default Leaderboard;
