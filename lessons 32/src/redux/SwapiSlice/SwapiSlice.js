import { createSlice } from '@reduxjs/toolkit';

const swapiSlice = createSlice({
  name: 'swapi',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchData: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearData: (state) => {
      state.data = null;
    },
  },
});

export const { fetchData, fetchDataSuccess, fetchDataFailure, clearData } =
  swapiSlice.actions;

export default swapiSlice.reducer;
