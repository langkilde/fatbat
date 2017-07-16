import {combineReducers} from "redux";
import {loginReducer} from "./loginReducer";
import {profileReducer} from "./profileReducer";

function logReducer(state = {}, action) {
  console.log("reducer action type:", action.type);
  
  return state;
}

const rootReducers = combineReducers({
  auth: loginReducer,
  log: logReducer,
  profile: profileReducer,
});

export default rootReducers;
