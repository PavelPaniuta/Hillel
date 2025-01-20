import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = ({ toggleTheme, theme }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1976d2",
        padding: "0 10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Pavel Paniuta - Front End Developer
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#ffea00" : "#fff",
              fontWeight: isActive ? "bold" : "normal",
              padding: "5px 10px",
              borderRadius: "5px",
              transition: "all 0.3s",
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/todo"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#ffea00" : "#fff",
              fontWeight: isActive ? "bold" : "normal",
              padding: "5px 10px",
              borderRadius: "5px",
              transition: "all 0.3s",
            })}
          >
            ToDo
          </NavLink>
          <NavLink
            to="/swapi"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#ffea00" : "#fff",
              fontWeight: isActive ? "bold" : "normal",
              padding: "5px 10px",
              borderRadius: "5px",
              transition: "all 0.3s",
            })}
          >
            Swapi
          </NavLink>

          <Button onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
