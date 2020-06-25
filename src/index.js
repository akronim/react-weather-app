"use strict";

import "./scss/app.scss";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Weather from "./js/views/weather";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import weatherReducer from "./js/redux/weatherReducer";

const store = createStore(weatherReducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <div className="container">
        <Weather />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
