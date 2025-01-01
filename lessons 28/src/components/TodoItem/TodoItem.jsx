import React from "react";

const TodoItem = ({ _id, text, checked, onDelete, onToggle }) => {
  return (
    <li className="todo-item" id={_id}>
      <input
        type="checkbox"
        className="todo-item__checkbox"
        checked={checked}
        onChange={(e) => onToggle(_id, e.target.checked)}
      />
      <span className={`todo-item__description ${checked ? "active" : ""}`}>
        {text}
      </span>
      <button className="todo-item__delete" onClick={() => onDelete(_id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;