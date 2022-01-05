/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "layerControl",
  initialState: {
    checked: {},
  },
  reducers: {
    check: (state, action) => {
      const { name } = action.payload;

      state.checked[name] = true;
    },
    uncheck: (state, action) => {
      const { name } = action.payload;
      state.checked[name] = false;
    },
    reset: (state) => {
      state.checked = {};
    },
  },
});

export const { check, uncheck, reset } = slice.actions;

export default slice.reducer;
