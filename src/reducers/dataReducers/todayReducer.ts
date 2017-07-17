import {FETCH_TODAY} from "../../actions/actionTypes";

export function todayReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_TODAY:
      const heartIntradayToday = action["activities-heart-intraday"];
      
      return {...state, heartIntradayToday};
    default:
      return state;
  }
}
