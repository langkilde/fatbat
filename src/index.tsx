import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router} from "react-router-dom";
import {applyMiddleware, createStore, Store as ReduxStore} from "redux";
import reduxThunk from "redux-thunk";

import "./images/favicon.ico";
import "./style/scss/all.scss";

import {App} from "./components/App";
import requireAuth from "./components/auth/RequireAuth";
import {Signin} from "./components/Signin";
import {COOKIE_TOKEN, COOKIE_USER_ID} from "./constants";
import history from "./historyCreator";
import {reducers} from "./reducers/index";
import {Store} from "./store/store";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store: ReduxStore<Store.All> = createStoreWithMiddleware(reducers);

// Dispatch stored login information to state if available
const userId = localStorage.getItem(COOKIE_USER_ID);
const token = localStorage.getItem(COOKIE_TOKEN);
if (token && userId) {
  store.dispatch({
    token,
    type: "LOGIN",
    userId,
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact={true} path="/" component={Signin}/>
        <Route path="/app" component={requireAuth(App)}/>
      </div>
    </Router>
  </Provider>
  , document.getElementById("root"));
