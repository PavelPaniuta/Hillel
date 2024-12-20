import React from "react";

const DeleteRes = (props) => {   
    return (
        <button
        style={{ backgroundColor: "red", color: "white", marginTop: "100px" }}
        onClick={() => props.deleteAllInfo()}
      >
       Оновити голосування
      </button>
    )
  }

export default DeleteRes;
