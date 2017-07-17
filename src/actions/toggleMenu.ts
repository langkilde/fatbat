import {TOGGLE_MENU} from "./types";

export function toggleMenu(isActive) {
  return (dispatch) => {
    dispatch({
      isActive,
      type: TOGGLE_MENU,
    });
  };
}
