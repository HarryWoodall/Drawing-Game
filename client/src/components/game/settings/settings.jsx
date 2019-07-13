import React, { Component } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Socket from "../../../sockets/socket";
import { ReactComponent as SettingsIcon } from "./settings-icon.svg";
import "./settings.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(this.props.socket),
      isShown: false,
      drawTime: props.settingsData.roomSettings.drawTime,
      countdownTime: props.settingsData.roomSettings.countdownTime,
      gameCompleteTime: props.settingsData.roomSettings.gameCompleteTime,
      gamesInRound: props.settingsData.roomSettings.gamesInRound,
      debuffsActive: props.settingsData.roomSettings.debuffsActive
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleDrawTimeSlider = this.handleDrawTimeSlider.bind(this);
    this.handleCountdownTimeSlider = this.handleCountdownTimeSlider.bind(this);
    this.handleGameCompleteTimeSlider = this.handleGameCompleteTimeSlider.bind(
      this
    );
    this.handleGamesInRoundSlider = this.handleGamesInRoundSlider.bind(this);
    this.handleDebuffsActiveToggle = this.handleDebuffsActiveToggle.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    let content = (
      <div>
        <h1
          id="settings-header"
          style={{
            top: window.innerHeight * 0.075
          }}
        >
          Settings
        </h1>
        <div
          id="settings-main-content"
          style={{
            top: window.innerHeight * 0.2,
            height: window.innerHeight * 0.5
          }}
        >
          <div className="settings-input-container">
            <h2>Drawing time</h2>
            <div className="settings-input-wrapper">
              <Slider
                onChange={this.handleDrawTimeSlider}
                min={0.5}
                max={10}
                step={0.5}
                value={this.state.drawTime}
              />
              <input
                type="text"
                value={this.state.drawTime}
                id="dt-settings-text"
                className="settings-text-input"
                onChange={this.handleText}
              />
            </div>
          </div>

          <div className="settings-input-container">
            <h2>Countdown time</h2>
            <div className="settings-input-wrapper">
              <Slider
                onChange={this.handleCountdownTimeSlider}
                min={0.5}
                max={10}
                step={0.5}
                value={this.state.countdownTime}
              />
              <input
                type="text"
                value={this.state.countdownTime}
                id="ct-settings-text"
                className="settings-text-input"
                onChange={this.handleText}
              />
            </div>
          </div>

          <div className="settings-input-container">
            <h2>Game complete time</h2>
            <div className="settings-input-wrapper">
              <Slider
                onChange={this.handleGameCompleteTimeSlider}
                min={0.5}
                max={10}
                step={0.5}
                value={this.state.gameCompleteTime}
              />
              <input
                type="text"
                value={this.state.gameCompleteTime}
                id="gct-settings-text"
                className="settings-text-input"
                onChange={this.handleText}
              />
            </div>
          </div>

          <div className="settings-input-container">
            <h2>Games in round</h2>
            <div className="settings-input-wrapper">
              <Slider
                onChange={this.handleGamesInRoundSlider}
                min={1}
                max={10}
                step={1}
                value={this.state.gamesInRound}
              />
              <input
                type="text"
                value={this.state.gamesInRound}
                id="gir-settings-text"
                className="settings-text-input"
                onChange={this.handleText}
              />
            </div>
          </div>
          <div className="settings-input-container">
            <h2>Debuffs active</h2>
            <div className="settings-input-wrapper">
              <input
                onChange={this.handleDebuffsActiveToggle}
                type="checkbox"
                checked={this.state.debuffsActive}
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          className="button"
          id="settings-submit"
          value="Confirm"
          style={{ top: window.innerHeight * 0.75 + "px" }}
          onClick={this.handleSubmit}
        />
      </div>
    );
    return (
      <div
        id="settings-overlay"
        style={{ height: window.innerHeight }}
        className={this.state.isShown ? "settings-visible" : "settings-hidden"}
      >
        <button id="settings-toggle" onClick={this.handleToggle}>
          <SettingsIcon
            id="settings-icon"
            fill={this.props.location === "Lobby" ? "gray" : "white"}
          />
        </button>
        {this.state.isShown ? content : null}
      </div>
    );
  }

  handleToggle() {
    this.setState({ isShown: !this.state.isShown });
  }

  handleDrawTimeSlider(e) {
    this.setState({ drawTime: e });
  }

  handleCountdownTimeSlider(e) {
    this.setState({ countdownTime: e });
  }

  handleGameCompleteTimeSlider(e) {
    this.setState({ gameCompleteTime: e });
  }

  handleGamesInRoundSlider(e) {
    this.setState({ gamesInRound: e });
  }

  handleDebuffsActiveToggle(e) {
    this.setState({ debuffsActive: e.currentTarget.checked });
  }

  handleText(e) {
    this.validateInput(e.target.value);
    if (e.target === document.activeElement) {
      switch (e.target.id) {
        case "dt-settings-text":
          this.setState({ drawTime: e.target.value });
          break;
        case "ct-settings-text":
          this.setState({ countdownTime: e.target.value });
          break;
        case "gct-settings-text":
          this.setState({ gameCompleteTime: e.target.value });
          break;
        default:
          return;
      }
    }
  }

  handleSubmit() {
    const settings = {
      drawTime: this.state.drawTime,
      countdownTime: this.state.countdownTime,
      gameCompleteTime: this.state.gameCompleteTime,
      gamesInRound: this.state.gamesInRound,
      debuffsActive: this.state.debuffsActive
    };
    this.state.socket.roomSettingsChange(settings);
    this.setState({ isShown: !this.state.isShown });
  }
}

export default Settings;
