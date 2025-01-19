import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todosReducer from '../redux/slices/todoSlice';
import { todoSaga } from '../redux/sagas/todosSaga';
import swapiReducer from "./SwapiSlice/SwapiSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todos: todosReducer,
    swapi: swapiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(todoSaga);


export default store;
