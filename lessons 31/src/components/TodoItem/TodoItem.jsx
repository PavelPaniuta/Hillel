import React, { useState } from "react";

const TodoItem = ({ _id, text, checked, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleSave = () => {
    if (newText.trim()) {
        onEdit(_id, newText); // Передаем ID и новый текст
        setIsEditing(false); // Выходим из режима редактирования
    }
};

  const handleCancel = () => {
    setNewText(text);
    setIsEditing(false);
  };

  return (
    <li className="todo-item" id={_id}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle(_id, e.target.checked)}
      />
      {isEditing ? (
        <div className="todo-item__edit-mode">
          <input
            type="text"
            className="todo-item__input"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button className="todo-item__save" onClick={handleSave}>
            Save
          </button>
          <button className="todo-item__cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <span className={`todo-item__description ${checked ? "active" : ""}`}>
          {text}
        </span>
      )}
      <button className="todo-item__cancel" onClick={() => setIsEditing(true)}>
        Edite
      </button>
      <button className="todo-item__delete" onClick={() => onDelete(_id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
