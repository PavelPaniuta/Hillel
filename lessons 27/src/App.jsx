import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from "./components/Todos/Todos";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./main.css";

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
    </ErrorBoundary>
  );
};

export default App;
