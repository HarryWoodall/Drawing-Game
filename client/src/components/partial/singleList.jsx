import React, { Component } from "react";

class SingleList extends Component {
  render() {
    return <ul className="single-list">{this.getListItems()}</ul>;
  }

  getListItems() {
    if (this.props.items) {
      console.log(this.props.items);

      return this.props.items.map(item => (
        <li
          key={item}
          className={
            this.props.applyAltClasses
              ? this.props.itemClass + this.props.applyAltClasses(item)
              : this.props.itemClass
          }
        >
          {this.props.extras ? (
            <React.Fragment>
              {this.props.extras(item)} {<span>{item}</span>}
            </React.Fragment>
          ) : (
            { item }
          )}
        </li>
      ));
    }
  }
}

export default SingleList;
