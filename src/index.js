import "@babel/polyfill";
import ReactDOM from "react-dom";
import React from "react";
import App from "./app";

import { Provider } from "react-redux";
import storeCreator from "@portal/store/index";

let store = storeCreator();
const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("app")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./app", () => {
    render(App);
  });
}
