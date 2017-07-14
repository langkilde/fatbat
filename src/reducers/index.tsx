import {combineReducers} from "redux";
import {STORE_FITBIT_TOKEN} from "../actions/types";

function storeFitbitToken(state = {}, action) {
  console.log("reducing action ", action);
  console.log("state before", state);
  switch (action.type) {
    case STORE_FITBIT_TOKEN:
      console.log("received store fitbit token action in reducer");
      const newState = {...state, token: action.token, userId: action.userId};
      console.log("newState", newState);
      
      return newState;
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  login: storeFitbitToken,
});

export default rootReducers;
