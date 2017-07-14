"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var redux_1 = require("redux");
var types_1 = require("../actions/types");
function storeFitbitToken(state, action) {
    if (state === void 0) { state = {}; }
    console.log("reducing action ", action);
    console.log("state before", state);
    switch (action.type) {
        case types_1.STORE_FITBIT_TOKEN:
            console.log("received store fitbit token action in reducer");
            var newState = __assign({}, state, { token: action.token, userId: action.userId });
            console.log("newState", newState);
            return newState;
        default:
            return state;
    }
}
var rootReducers = redux_1.combineReducers({
    login: storeFitbitToken
});
exports["default"] = rootReducers;
//# sourceMappingURL=index.js.map