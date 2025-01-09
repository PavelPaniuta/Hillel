import React from "react";
import { useDispatch } from "react-redux";
import { clearData } from "../../redux/SwapiSlice/SwapiSlice";

const Footer = () => {
  const dispatch = useDispatch();

  const clearStoreData = () => {
    dispatch(clearData());
  };

  return (
    <footer>
      <button onClick={clearStoreData}>Clear</button>
    </footer>
  );
};

export default Footer;
