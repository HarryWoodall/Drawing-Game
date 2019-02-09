import React, { Component } from "react";
import ReadyTable from "../partial/readyTable/readyTable";

class ReadyTableTest extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      mods: [
        { user: "bill", mod: "ADD" },
        { user: "bob", mod: "ADD" },
        { user: "bill", mod: "REMOVE" },
        { user: "bob", mod: "REMOVE" }
      ]
    };

    this.runTests = this.runTests.bind(this);

    this.runTests();
  }

  render() {
    return (
      <ReadyTable
        test={true}
        modification={this.state.mods[this.state.index]}
      />
    );
  }

  runTests() {
    let index = -1;

    setInterval(() => {
      index++;
      if (index < this.state.mods.length) {
        this.setState({
          index: index
        });
      }
    }, 2000);
  }
}

export default ReadyTableTest;
