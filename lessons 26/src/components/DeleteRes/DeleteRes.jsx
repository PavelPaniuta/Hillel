import React from "react";

const DeleteRes = ({deleteAllInfo}) => {   
    return (
        <button
        style={{ backgroundColor: "red", color: "white", marginTop: "100px" }}
        onClick={() => deleteAllInfo()}
      >
       Оновити голосування
      </button>
    )
  }

export default DeleteRes;
