import React from "react";
import { decrement, increment } from "../../redux/slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const About = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span style={{ margin: "10px", fontSize: "22px" }}>Value: {count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </main>
  );
};

export default About;
