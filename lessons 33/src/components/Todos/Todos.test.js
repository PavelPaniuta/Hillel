import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Todos from "./Todos";
import userEvent from "@testing-library/user-event";


const mockStore = configureStore([]);

describe("Todos Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      todos: {
        todos: [], 
        loading: false,
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });
  
test("renders the TODO page header", () => {
  render(
    <Provider store={store}>
      <Todos />
    </Provider>
  );

  const header = screen.getByText(/ToDoList/i); 
  expect(header).toBeInTheDocument();
});

test("allows entering letters and numbers in the text field", async () => {
  render(
    <Provider store={store}>
      <Todos />
    </Provider>
  );

  const input = screen.getByTestId("todo-name"); 
  await userEvent.type(input, "Task123");

  expect(input).toHaveValue("Task123"); 
});

test("shows validation error when adding an empty task", async () => {
  render(
    <Provider store={store}>
      <Todos />
    </Provider>
  );

  const addButton = screen.getByTestId("todo-add"); 
  userEvent.click(addButton); 

  const errorMessage = await screen.findByText("Todo item cannot be empty"); 
  expect(errorMessage).toBeInTheDocument();
});

test("adds a new task to the list when submitting valid text", async () => {
  render(
    <Provider store={store}>
      <Todos />
    </Provider>
  );

  const input = screen.getByTestId("todo-name");
  const addButton = screen.getByTestId("todo-add");

  await userEvent.type(input, "New Task");
  userEvent.click(addButton);

  const newTask = await screen.findByText("New Task"); 
  expect(newTask).toBeInTheDocument(); 
});

test("clears all tasks when 'Delete All Todos' is clicked", () => {
  render(
    <Provider store={store}>
      <Todos />
    </Provider>
  );

  const deleteAllButton = screen.getByText("Delete All Todos"); 
  userEvent.click(deleteAllButton);

  const todos = screen.queryAllByRole("listitem");
  expect(todos.length).toBe(0);
});

});