import { call, put, takeEvery } from 'redux-saga/effects';

const API_BASE_URL = 'http://localhost:8080/todos';

const fetchTodosApi = async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
};

const addTodoApi = async (newTodo) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
    });
    if (!response.ok) throw new Error('Failed to add todo');
    return response.json();
};

const deleteTodoApi = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete todo');
    return id;
};

const toggleTodoApi = async ({ id, checked }) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checked }),
  });
  if (!response.ok) throw new Error('Failed to toggle todo');
  return response.json();
};

const deleteAllTodosApi = async () => {
    const response = await fetch(API_BASE_URL, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete all todos');
    return response.json();
};

const editTodoApi = async ({ id, updates }) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to edit todo');
  return response.json();
};

function* editTodoSaga(action) {
  try {
      const updatedTodo = yield call(editTodoApi, action.payload);
      yield put({ type: 'todos/editTodoSuccess', payload: updatedTodo });
  } catch (error) {
      yield put({ type: 'todos/editTodoFailure', payload: error.message });
  }
}

function* fetchTodosSaga() {
    try {
        const todos = yield call(fetchTodosApi);
        yield put({ type: 'todos/fetchTodosSuccess', payload: todos });
    } catch (error) {
        yield put({ type: 'todos/fetchTodosFailure', payload: error.message });
    }
}

function* addTodoSaga(action) {
    try {
        const newTodo = yield call(addTodoApi, action.payload);
        yield put({ type: 'todos/addTodoSuccess', payload: newTodo });
    } catch (error) {
        yield put({ type: 'todos/addTodoFailure', payload: error.message });
    }
}

function* deleteTodoSaga(action) {
    try {
        const id = yield call(deleteTodoApi, action.payload);
        yield put({ type: 'todos/deleteTodoSuccess', payload: id });
    } catch (error) {
        yield put({ type: 'todos/deleteTodoFailure', payload: error.message });
    }
}

function* toggleTodoSaga(action) {
  try {
      const updatedTodo = yield call(toggleTodoApi, action.payload);
      yield put({ type: 'todos/toggleTodoSuccess', payload: updatedTodo });
  } catch (error) {
      yield put({ type: 'todos/toggleTodoFailure', payload: error.message });
  }
}

function* deleteAllTodosSaga() {
    try {
        yield call(deleteAllTodosApi);
        yield put({ type: 'todos/deleteAllTodosSuccess' });
    } catch (error) {
        yield put({ type: 'todos/deleteAllTodosFailure', payload: error.message });
    }
}

export function* todoSaga() {
  yield takeEvery('todos/fetchTodos', fetchTodosSaga);
  yield takeEvery('todos/addTodo', addTodoSaga);
  yield takeEvery('todos/deleteTodo', deleteTodoSaga);
  yield takeEvery('todos/toggleTodo', toggleTodoSaga); 
  yield takeEvery('todos/deleteAllTodos', deleteAllTodosSaga);
  yield takeEvery('todos/editTodo', editTodoSaga);
}