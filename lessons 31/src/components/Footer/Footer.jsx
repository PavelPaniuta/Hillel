import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const todos = useSelector((state) => state.todos.todos);
  return <footer><p style={{fontSize:'26px'}}>Total todos: {todos.length}</p></footer>;
};

export default Footer;