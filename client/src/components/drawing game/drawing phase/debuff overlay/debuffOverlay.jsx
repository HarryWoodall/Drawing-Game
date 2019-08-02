import React, { Component } from "react";
import { Transition } from "react-spring/renderprops";
import "./debuffOverlay.css";

class DebuffOverlay extends Component {
  constructor(props) {
    super(props);

    this.invisibleInk = {
      style: {
        top: window.innerHeight * 0.3,
        color: "white",
        textShadow: "0px 0px 10px #606060",
        fontFamily: "cursive"
      },
      animation: {
        items: this.props.debuff,
        duration: 200,
        from: { opacity: 0, transform: "translate(-50%, -100%)" },
        enter: { opacity: 1, transform: "translate(-50%,-50%)" },
        leave: { opacity: 0 }
      }
    };

    this.offset = {
      style: {
        color: "gray",
        fontWeight: "bold"
      },
      animation: {
        items: this.props.debuff,
        duration: 200,
        from: {
          top: window.innerHeight * 0.1,
          opacity: 0,
          transform: "translate(-50%, -50%) rotate(0deg)"
        },
        enter: {
          top: window.innerHeight * 0.3,
          opacity: 1,
          transform: "translate(-50%, -50%) rotate(30deg)"
        },
        leave: { top: 0, opacity: 0 }
      }
    };

    this.mirror = {
      style: {
        color: "blue",
        fontWeight: "bold",
        top: window.innerHeight * 0.3
      },
      animation: {
        items: this.props.debuff
          .split("")
          .reverse()
          .join(""),
        duration: 1000,
        from: {
          transform: "translate(-50%, -50%) rotateY(0deg)",
          opacity: 0
        },
        enter: {
          transform: "translate(-50%, -50%) rotateY(180deg)",
          opacity: 1
        },
        leave: { opacity: 0 }
      }
    };
    console.log(this.offset.animation);
  }

  componentWillMount() {
    switch (this.props.debuff) {
      case "Invisible Ink":
        this.setState({ currentDebuff: this.invisibleInk });
        break;
      case "Offset":
        this.setState({ currentDebuff: this.offset });
        break;
      case "Mirror":
        this.setState({ currentDebuff: this.mirror });
        break;
      default:
        break;
    }
  }

  render() {
    const currentDebuff = this.state.currentDebuff;
    return (
      <div id="debuff-overlay" style={{ height: window.innerHeight }}>
        <Transition
          items={currentDebuff.animation.items}
          config={{ duration: currentDebuff.animation.duration }}
          from={currentDebuff.animation.from}
          enter={currentDebuff.animation.enter}
          leave={currentDebuff.animation.leave}
        >
          {(item, state, index) => props => (
            <h1 style={Object.assign(props, currentDebuff.style)}>{item}</h1>
          )}
        </Transition>
      </div>
    );
  }
}

DebuffOverlay.defaultProps = {
  debuff: "debuffName_placeholder"
};
export default DebuffOverlay;
