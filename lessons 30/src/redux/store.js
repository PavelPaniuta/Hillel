import { configureStore } from "@reduxjs/toolkit";// Исправлено
import swapiReducer from "./SwapiSlice/SwapiSlice";

const store = configureStore({
  reducer: {
    swapi: swapiReducer,
  }
});

export default store;
