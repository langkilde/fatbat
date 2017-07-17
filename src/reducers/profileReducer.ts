import {FETCHED_PROFILE} from "../actions/actionTypes";

export function profileReducer(state = {}, actions) {
  switch (actions.type) {
    case FETCHED_PROFILE:
      const {type, ...addToState} = actions; // do not add type to state
      
      return {...state,  ...addToState};
    default:
      return state;
  }
}
