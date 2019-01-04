import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore, combineReducers } from "redux";
import reducers from "./reducers";

ReactDOM.render(
  <App store={createStore(combineReducers(reducers))} />,
  document.getElementById("root")
);
