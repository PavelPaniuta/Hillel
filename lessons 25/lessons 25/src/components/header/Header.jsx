import React from "react";
import { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1 className="header">{this.props.text}</h1>;
  }
}

export default Header;
