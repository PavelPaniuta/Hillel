import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {

    fetchTodos: (state) => {
      state.loading = true;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addTodo: (state) => {
      state.loading = true;
    },
    addTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    },
    addTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTodo: (state) => {
      state.loading = true;
    },
    deleteTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    deleteTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    toggleTodo: (state) => {
      state.loading = true;
    },
    toggleTodoSuccess: (state, action) => {
      state.loading = false;
      const updatedTodo = action.payload;
      const index = state.todos.findIndex((todo) => todo._id === updatedTodo._id);
      if (index !== -1) {
          state.todos[index] = updatedTodo; // Обновляем задачу
      }
  },
    toggleTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.error('Error toggling todo:', action.payload);
    },

    editTodo: (state) => {
      state.loading = true;
    },
    editTodoSuccess: (state, action) => {
      state.loading = false;
      const updatedTodo = action.payload;
      const index = state.todos.findIndex((todo) => todo._id === updatedTodo._id);
      if (index !== -1) {
          state.todos[index] = updatedTodo; // Заменяем отредактированную задачу
      }
  },
    editTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteAllTodos: (state) => {
      state.loading = true;
    },
    deleteAllTodosSuccess: (state) => {
      state.loading = false;
      state.todos = [];
    },
    deleteAllTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodos,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodo,
  addTodoSuccess,
  addTodoFailure,
  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailure,
  toggleTodo,
  toggleTodoSuccess,
  toggleTodoFailure,
  editTodo,
  editTodoSuccess,
  editTodoFailure,
  deleteAllTodos,
  deleteAllTodosSuccess,
  deleteAllTodosFailure,
} = todosSlice.actions;

export default todosSlice.reducer;
