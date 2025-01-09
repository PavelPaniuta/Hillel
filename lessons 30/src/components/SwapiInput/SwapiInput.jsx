import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../redux/SwapiSlice/SwapiSlice";

const SwapiInput = () => {
  const dispatch = useDispatch();

  const fixedPart = "https://swapi.py4e.com/api/";
  const [editablePart, setEditablePart] = useState("");

  const fullUrl = `${fixedPart}${editablePart}`;

  const loadData = (fullUrl) => {
    dispatch(fetchData(fullUrl));
  };
  return (
    <div style={styles.container}>
      <div style={styles.inputWrapper}>
        <span style={styles.fixedPart}>{fixedPart}</span>
        <input
          type="text"
          value={editablePart}
          onChange={(e) => setEditablePart(e.target.value)}
          placeholder="people/1"
          style={styles.input}
        />
      </div>
      <button onClick={() => loadData(fullUrl)} style={styles.button}>
        Get info
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    overflow: "hidden",
  },
  fixedPart: {
    backgroundColor: "#f3f3f3",
    padding: "5px 10px",
    color: "#555",
    fontWeight: "bold",
    userSelect: "none",
  },
  input: {
    border: "none",
    outline: "none",
    padding: "5px 10px",
    flexGrow: 1,
  },
  button: {
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SwapiInput;
