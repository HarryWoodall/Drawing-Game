import React, { Component } from "react";
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
      gameCompleteTime: props.settingsData.roomSettings.gameCompleteTime
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
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
            height: window.innerHeight * 0.6
          }}
        >
          <div className="settings-input-container">
            <h2>Drawing time</h2>
            <div className="settings-input-wrapper">
              <input
                type="range"
                min="1"
                max="20"
                value={this.state.drawTime}
                id="dt-settings-slider"
                className="settings-slider-input"
                onChange={this.handleSlider}
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
              <input
                type="range"
                min="1"
                max="20"
                value={this.state.countdownTime}
                id="ct-settings-slider"
                className="settings-slider-input"
                onChange={this.handleSlider}
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
              <input
                type="range"
                min="1"
                max="20"
                value={this.state.gameCompleteTime}
                id="gct-settings-slider"
                className="settings-slider-input"
                onChange={this.handleSlider}
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
        </div>
        <input
          type="submit"
          value="Confirm"
          id="settings-submit"
          className="button"
          style={{ top: window.innerHeight * 0.8 }}
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
          <SettingsIcon id="settings-icon" />
        </button>
        {this.state.isShown ? content : null}
      </div>
    );
  }

  handleToggle() {
    this.setState({ isShown: !this.state.isShown });
  }

  handleSlider(e) {
    if (e.target === document.activeElement) {
      switch (e.target.id) {
        case "dt-settings-slider":
          this.setState({ drawTime: e.target.value });
          break;
        case "ct-settings-slider":
          this.setState({ countdownTime: e.target.value });
          break;
        case "gct-settings-slider":
          this.setState({ gameCompleteTime: e.target.value });
          break;
        default:
          return;
      }
    }
  }

  handleText(e) {
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
      gameCompleteTime: this.state.gameCompleteTime
    };
    this.state.socket.roomSettingsChange(settings);
    this.setState({ isShown: !this.state.isShown });
  }
}

export default Settings;
