/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "geoserver",
  initialState: {
    workspaces: [],
    layers: [],
    styles: [],

    currentWorkspace: null,
    currentLayer: null,
    currentStyle: null,
    currentStyleFormat: null,
  },
  reducers: {
    // save workspaces
    saveWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },

    // save layers
    saveLayers: (state, action) => {
      state.layers = action.payload;
    },

    // save styles
    saveStyles: (state, action) => {
      state.styles = action.payload;
    },

    setWorkspace: (state, action) => {
      state.currentWorkspace = action.payload;
      state.currentLayer = null;
      state.currentStyle = null;
    },
    setLayer: (state, action) => {
      state.currentLayer = action.payload;
      state.currentStyle = null;
    },
    setStyle: (state, action) => {
      state.currentStyle = action.payload;
    },
    setCurrentStyleFormat: (state, action) => {
      // 注意不要在点击编辑按钮的同时设置这一项，路由跳转到编辑界面后会自动更新它，以确保是即时结果
      // 并且保证save button那边能拿到，拿不到就不显示save button
      state.currentStyleFormat = action.payload;
    },
  },
});

export const {
  saveWorkspaces,
  saveLayers,
  saveStyles,
  setWorkspace,
  setLayer,
  setStyle,
  setCurrentStyleFormat,
} = slice.actions;

export default slice.reducer;
