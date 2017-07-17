import {TOGGLE_MENU} from "../actions/actionTypes";

export function menuReducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      if (!action.isActive) {
        
        return {...state, active: true};
      }
      
      return {...state, active: false};
    default:
      return state;
  }
}
