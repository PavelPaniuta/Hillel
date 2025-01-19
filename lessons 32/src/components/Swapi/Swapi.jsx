import React from "react";
import SwapiInput from "../SwapiInput/SwapiInput";
import SwapiResult from "../SwapiResult/SwapiResult";

const Swapi = () => {
  return (
    <div className="container">
        <h1>SWAPI</h1>
        <SwapiInput />
        <SwapiResult />
        
      </div>
  )
};

export default Swapi;