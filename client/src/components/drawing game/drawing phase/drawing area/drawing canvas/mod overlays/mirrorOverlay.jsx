import React, { Component } from "react";
import "./mirrorOverlay.css";

class MirrorOverlay extends Component {
  constructor(props) {
    super(props);
    this.divId = null;

    switch (this.props.type) {
      case "VERTICAL":
        this.divId = "mirror-overlay-vertical";
        break;
      case "HORIZONTAL":
        this.divId = "mirror-overlay-horizontal";
        break;
      default:
        this.divId = null;
        break;
    }

    this.state = {
      divId: this.divId
    };
  }

  render() {
    if (this.divId) {
      if (this.props.type === "HORIZONTAL") {
        return (
          <div
            id={this.state.divId}
            style={{
              height: window.innerHeight * 0.7,
              top: 0
            }}
          />
        );
      } else {
        return (
          <div
            id={this.state.divId}
            style={{
              width: window.innerWidth * 0.8
            }}
          />
        );
      }
    } else {
      return (
        <React.Fragment>
          <div
            id="mirror-overlay-horizontal"
            style={{
              height: window.innerHeight * 0.7,
              top: 0
            }}
          />
          <div
            id="mirror-overlay-vertical"
            style={{
              width: window.innerWidth * 0.8
            }}
          />
        </React.Fragment>
      );
    }
  }
}

export default MirrorOverlay;
