"use strict";
/* eslint-env browser */
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var redux_1 = require("redux");
var redux_2 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var dashboard_1 = require("./components/dashboard");
var signin_1 = require("./components/signin");
var reducers_1 = require("./reducers");
require("./assets/images/favicon.ico");
require("./style/scss/all.scss");
var createStoreWithMiddleware = redux_1.applyMiddleware(redux_thunk_1["default"])(redux_2.createStore);
var store = createStoreWithMiddleware(reducers_1["default"]);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement("div", null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: signin_1["default"] }),
            React.createElement(react_router_dom_1.Route, { path: "/dashboard", component: dashboard_1["default"] })))), document.querySelector(".root"));
//# sourceMappingURL=index.js.map