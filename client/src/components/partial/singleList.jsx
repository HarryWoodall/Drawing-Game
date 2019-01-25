import React, { Component } from "react";

class SingleList extends Component {
  render() {
    return <ul>{this.getListItems()}</ul>;
  }

  getListItems() {
    if (this.props.items) {
      console.log(this.props.items);

      return this.props.items.map(item => <li key={item}>{item}</li>);
    }
  }
}

export default SingleList;
