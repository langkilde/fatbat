import {TOGGLE_MENU} from "./actionTypes";

export function toggleMenu(isActive) {
  return (dispatch) => {
    dispatch({
      isActive,
      type: TOGGLE_MENU,
    });
  };
}
