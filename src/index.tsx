/* eslint-env browser */

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Route,
} from "react-router-dom";
import {applyMiddleware} from "redux";
import {createStore} from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/app";
import Dashboard from "./components/dashboard";
import Signin from "./components/signin";
import reducers from "./reducers";

import "./assets/images/favicon.ico";
import "./style/scss/all.scss";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Signin}/>
        <Route path="/dashboard" component={Dashboard}/>
      </div>
    </Router>
  </Provider>
  , document.querySelector(".root"));
