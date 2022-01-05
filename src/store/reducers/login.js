/* eslint-disable no-undef */
// import { USER_LOGIN, USER_SIGN_OUT, USER_VALIDATE } from "@portal/constant/apis.js";
import { createSlice } from "@reduxjs/toolkit";
// import { apiCallBegan } from "@portal/store/api.js";

const slice = createSlice({
  name: "login",
  initialState: {
    loggedIn: false,
    username: null,
    token: null,
    server: null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.username = action.payload.username;
      state.token = action.payload.password;
      state.server = action.payload.server;
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("token", action.payload.password);
      localStorage.setItem("server", action.payload.server);
    },
    logout: (state) => {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("server");
      state.username = null;
      state.token = null;
      state.server = null;
      state.loggedIn = false;
    }
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;
