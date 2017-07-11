/* eslint-env browser */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/app";
import reducers from "./reducers";

import "./assets/images/favicon.ico";
import "./style/scss/all.scss";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.querySelector(".root"));
