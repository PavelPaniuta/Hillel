import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from "../Todos/Todos";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../Home/Home";
import Swapi from "../Swapi/Swapi";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import "./main.css";
import store from '../../redux/store'
import { Provider } from 'react-redux'
import Home from "../Home/Home";

const App = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      const defaultTheme = "light";
      setTheme(defaultTheme);
      localStorage.setItem("theme", defaultTheme);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ErrorBoundary>
      <Provider store={store}>
      <div className="container-fluid">
        <Router>
          <Header toggleTheme={toggleTheme} theme={theme} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todo" element={<Todos />} />
              <Route path="/swapi" element={<Swapi />} />
              <Route path="*" element={<h2>404</h2>} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
