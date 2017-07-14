/* eslint-env browser */

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import {Link, Route, Router} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import reduxThunk from "redux-thunk";
import Dashboard from "./components/dashboard";
import Signin from "./components/signin";
import history from "./history";
import reducers from "./reducers";

import "./assets/images/favicon.ico";
import "./style/scss/all.scss";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

console.log("stored state", store.getState());
console.log("history", history);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={Signin}/>
        <Route path="/dashboard" component={Dashboard}/>
      </div>
    </Router>
  </Provider>
  , document.querySelector(".root"));
