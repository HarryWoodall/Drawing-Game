import React, { Component } from "react";

class ReadyTableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextAction: [],
      currentAction: this.props.currentAction,
      previousAction: null,
      currentClass: "",
      performingAction: false,
      isAlive: true
    };

    this.performAction = this.performAction.bind(this);
  }

  componentDidMount() {
    if (!this.state.performingAction) {
      this.setState({ performingAction: true }, () => {
        this.performAction();
      });
    }
  }

  componentDidUpdate() {
    if (
      !(
        this.state.currentAction !== null ||
        this.props.currentAction === this.state.previousAction
      )
    ) {
      this.setState({ currentAction: this.props.currentAction });
    } else {
      if (
        this.props.currentAction !== this.state.currentAction &&
        !this.state.nextAction.includes(this.props.currentAction)
      ) {
        this.state.nextAction.push(this.props.currentAction);
      }
    }

    console.log("current action", this.state.currentAction);

    if (this.state.currentAction && !this.state.performingAction) {
      this.setState({ performingAction: true }, () => {
        this.performAction();
      });
    }
  }

  render() {
    return (
      <li
        key={this.props.key}
        ref={this.props.ref}
        className={this.props.className + this.state.currentClass}
      >
        {this.props.content}
      </li>
    );
  }

  performAction() {
    if (this.state.currentAction) {
      console.log("starting action");
      this.setState(
        { currentClass: this.state.currentAction.className },
        () => {
          setTimeout(() => {
            if (
              this.state.currentAction &&
              this.state.currentAction.className === "removing-user"
            ) {
              this.killTableItem();

              // Possible obsoltete
              this.setState(
                {
                  isAlive: false
                },
                () => {
                  return;
                }
              );
            }

            if (this.state.nextAction.length > 0) {
              console.log("next action", this.state.nextAction);

              this.setState(
                { currentAction: this.state.nextAction.shift() },
                () => {
                  this.performAction();
                }
              );
            } else {
              console.log("ending action");

              this.setState({
                previousAction: this.state.currentAction,
                currentAction: null,
                currentClass: "",
                performingAction: false
              });
            }
          }, this.state.currentAction.time);
        }
      );
    }
  }

  killTableItem() {
    this.props.onItemDeath(this.props.content);
  }
}

export default ReadyTableItem;
