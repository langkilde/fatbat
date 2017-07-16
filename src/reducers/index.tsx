import {combineReducers} from "redux";
import {LOGIN} from "../actions/types";

function logReducer(state = {}, action) {
  console.log("reducer action type:", action.type);
  
  return state;
}

function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      console.log("received login in reducer");
    
      return {...state, authenticated: true, token: action.token, userId: action.userId};
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  auth: loginReducer,
  log: logReducer,
});

export default rootReducers;
