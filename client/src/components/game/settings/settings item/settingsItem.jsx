import React, { Component } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";


// TODO -- Value settings making slider unable to move. 
class SettingsItem extends Component {
  render() {
    return (
      <div className="settings-input-container">
        <h2>{this.props.title}</h2>
        <div className="settings-input-wrapper">
          <Slider
            onChange={this.onSliderChange}
            min={this.props.sliderMin}
            max={this.props.sliderMax}
            step={this.props.sliderStep}
            value={this.props.sliderValue}
          />

          <input
            type="text"
            value={this.props.inputValue}
            id={this.props.inputId}
            className="settings-text-input"
            onChange={this.props.handleInput}
          />
        </div>
      </div>
    );
  }
}
export default SettingsItem;
