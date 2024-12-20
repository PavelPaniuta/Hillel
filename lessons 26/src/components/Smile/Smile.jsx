import React from "react";

const Smile = ({ items, handleSmileClick }) => {
  if (!items || items.length === 0) {
    return <p>No emojis to display!</p>;
  }

  return (
    <div className="container">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSmileClick(item.id)}
          style={{ cursor: "pointer" }}
        >
          <h1>{item.content}</h1>
          <p>{item.smile}</p>
        </div>
      ))}
    </div>
  );
};

export default Smile;
