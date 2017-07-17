import {combineReducers} from "redux";
import {todayReducer} from "./dataReducers/todayReducer";
import {loginReducer} from "./loginReducer";
import {menuReducer} from "./menuReducer";
import {profileReducer} from "./profileReducer";

function logReducer(state = {}, action) {
  console.log("reducer action type:", action.type);
  
  return state;
}

const rootReducers = combineReducers({
  auth: loginReducer,
  data: todayReducer,
  log: logReducer,
  menu: menuReducer,
  profile: profileReducer,
});

export default rootReducers;
