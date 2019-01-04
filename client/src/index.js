import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore, combineReducers } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";

const store = createStore(combineReducers({ app: reducers }), {});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
