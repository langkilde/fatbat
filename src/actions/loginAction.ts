import {COOKIE_TOKEN, COOKIE_USER_ID, LOGIN} from "./actionTypes";

export function login(userId, token) {
  return (dispatch) => {
    dispatch({
      authenticated: true,
      token,
      type: LOGIN,
      userId,
    });
    localStorage.setItem(COOKIE_USER_ID, userId);
    localStorage.setItem(COOKIE_TOKEN, token);
  };
}
