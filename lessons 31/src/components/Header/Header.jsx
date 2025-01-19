import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = ({toggleTheme, theme}) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "activete" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "activete" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "activete" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="custom-container">
        <button className='btnz' onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
        </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
