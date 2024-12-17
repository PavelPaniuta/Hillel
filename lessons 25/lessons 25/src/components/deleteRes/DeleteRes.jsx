import React from "react";
import { Component } from "react";

class DeleteRes extends Component {
  constructor(props) {
    super(props);
  }
  render() {    
   
    return (
        <button
        style={{ backgroundColor: "red", color: "white", marginTop: "100px" }}
        onClick={() => this.props.deleteAllInfo()}
      >
       Оновити голосування
      </button>
    )
  }
}

export default DeleteRes;
