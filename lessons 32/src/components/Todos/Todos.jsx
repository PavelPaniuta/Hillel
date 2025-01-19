import React, { useEffect } from "react";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoItem from "../TodoItem/TodoItem";
import "./Todos.scss";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  deleteAllTodos,
} from "../../redux/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

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
      text,
      checked: false,
    };
    dispatch(addTodo(newTodo));
  };

  const handleDeleteTodo = (_id) => {
    dispatch(deleteTodo(_id));
  };

  const handleToggleTodo = (_id, checked) => {
    dispatch(toggleTodo({ id: _id, checked }));
  };

  const handleEditTodo = (_id, newText) => {
    dispatch(editTodo({ id: _id, updates: { text: newText } }));
  };

  const handleDeleteAllTodos = () => {
    dispatch(deleteAllTodos());
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <h2>ToDoList</h2>
      <AddTodoForm onAdd={handleAddTodo} />
      <Button
        onClick={handleDeleteAllTodos}
        variant="contained"
        style={{ marginBottom: "20px" }}
      >
        Delete All Todos
      </Button>
      <ul className="js--todos-wrapper">
        {todos.map(({ _id, text, checked }) => (
          <TodoItem
            key={_id}
            _id={_id}
            text={text}
            checked={checked}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
            onEdit={handleEditTodo}
          />
        ))}
      </ul>

      <Alert variant="outlined" severity="info">
        Total todos: {todos.length}
      </Alert>
    </main>
  );
};

export default Todos;
