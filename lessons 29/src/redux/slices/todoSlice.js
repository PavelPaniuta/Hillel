import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("http://localhost:8080/todos");
  const data = await response.json();
  return data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  const response = await fetch("http://localhost:8080/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  const data = await response.json();
  return data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (_id) => {
  await fetch(`http://localhost:8080/todos/${_id}`, {
    method: "DELETE",
  });
  return _id;
});

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ _id, checked }) => {
    await fetch(`http://localhost:8080/todos/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked }),
    });
    return { _id, checked };
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const { _id, checked } = action.payload;
        const todo = state.todos.find((todo) => todo._id === _id);
        if (todo) todo.checked = checked;
      });
  },
});

export default todosSlice.reducer;
