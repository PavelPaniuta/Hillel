import React, { useState, useEffect } from "react";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoItem from "../TodoItem/TodoItem";
import "./Todos.scss";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
} from "../../redux/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: +new Date(),
      text,
      checked: false,
    };
    dispatch(addTodo(newTodo));
  };

  const handleDeleteTodo = (_id) => {
    dispatch(deleteTodo(_id));
  };

  const handleToggleTodo = (_id, checked) => {
    dispatch(toggleTodo({ _id, checked }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <h1>ToDoList</h1>
      <AddTodoForm onAdd={handleAddTodo} />
      <ul className="js--todos-wrapper">
        {todos.map(({ _id, text, checked }) => (
          <TodoItem
            key={_id}
            _id={_id}
            text={text}
            checked={checked}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
          />
        ))}
      </ul>
      
    </main>
  );
};

export default Todos;