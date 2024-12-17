import React from "react";
import { Component } from "react";

class Smile extends Component {
  constructor(props) {
    super(props);
  }
  render() {    
    const smiles = this.props.item.map((item) => item.content);
    return (
        <div className="container">
        {smiles.map((content, index) => (
          <div
            key={index}
            onClick={() => this.props.handleSmileClick(index + 1)}
            style={{ cursor: "pointer" }}
          >
            <h1>{content}</h1>
            <p>{this.props.item[index].smile}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Smile;
