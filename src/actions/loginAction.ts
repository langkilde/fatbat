import {COOKIE_TOKEN, COOKIE_USER_ID, LOGIN} from "./types";

export function login(userId, token) {
  return (dispatch) => {
    console.log("dispatching login action");
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
