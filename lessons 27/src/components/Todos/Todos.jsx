import React, { useState, useEffect } from "react";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoItem from "../TodoItem/TodoItem";
import "./Todos.scss";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      setError(error);
    }
  };

  const addTodo = async (text) => {
    const newTodo = {
      id: +new Date(),
      text,
      checked: false,
    };

    try {
      const response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const savedTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, savedTodo]);
    } catch (error) {
      setError(error);
    }
  };

  const deleteTodo = async (_id) => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${_id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(`Failed to delete todo with id: ${_id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    } catch (error) {
      setError(error);
    }
  };

  const toggleTodo = async (_id, checked) => {
    try {
      await fetch(`http://localhost:8080/todos/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked }),
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === _id ? { ...todo, checked } : todo
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (error) {
    throw error;
  }

  return (
    <main>
      <h1>ToDoList</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul className="js--todos-wrapper">
        {todos.map(({ _id, text, checked }) => (
          <TodoItem
            key={_id}
            _id={_id}
            text={text}
            checked={checked}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </ul>
    </main>
  );
};

export default Todos;
