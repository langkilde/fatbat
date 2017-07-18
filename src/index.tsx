/* eslint-env browser */

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import {Link, Route, Router} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import reduxThunk from "redux-thunk";
import {COOKIE_TOKEN, COOKIE_USER_ID, LOGIN} from "./actions/actionTypes";
import App from "./components/App";
import RequireAuth from "./components/auth/RequireAuth";
import Signin from "./components/Signin";
import history from "./historyCreator";
import reducers from "./reducers/index";

import "./assets/images/favicon.ico";
import "./style/scss/all.scss";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// Dispatch stored login information to state if available
const userId = localStorage.getItem(COOKIE_USER_ID);
const token = localStorage.getItem(COOKIE_TOKEN);
if (token && userId) {
  store.dispatch({
    token,
    type: LOGIN,
    userId,
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={Signin}/>
        <Route path="/app" component={RequireAuth(App)}/>
      </div>
    </Router>
  </Provider>
  , document.querySelector(".root"));
