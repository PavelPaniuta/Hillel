import React, { useState } from "react";

const AddTodoForm = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim()) {
      onAdd(newTodo);
      setNewTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form js--form">
      <input
        type="text"
        className="form__input js--form__input"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        required
      />
      <button className="form__btn">Add</button>
    </form>
  );
};

export default AddTodoForm;