"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actions/actionTypes");
function menuReducer(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case actionTypes_1.TOGGLE_MENU:
            if (!action.isActive) {
                return __assign({}, state, { active: true });
            }
            return __assign({}, state, { active: false });
        default:
            return state;
    }
}
exports.menuReducer = menuReducer;
