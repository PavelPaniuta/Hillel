import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice.js';
import productsReducer from "./Slice/productsSlice";

export const store = configureStore({
    reducer: {
      auth: authReducer,
      products: productsReducer,
    },
  });