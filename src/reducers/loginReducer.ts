import {LOGIN} from "../actions/actionTypes";

export function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      console.log("received login in reducer");
      
      return {...state, authenticated: true, token: action.token, userId: action.userId};
    default:
      return state;
  }
}
