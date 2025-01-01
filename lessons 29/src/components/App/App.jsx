import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from "../Todos/Todos";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import Contact from "../Contact/Contact";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import "./main.css";
import store from '../../redux/store'
import { Provider } from 'react-redux'

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
              <Route path="/" element={<Todos />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
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
