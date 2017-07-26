/* tslint:disable:interface-over-type-literal */
import axios from "axios";
import {Dispatch} from "redux";

export type Action = {
  token: string,
  type: "LOGIN",
  userId: string,
} | {
  type: "LOGOUT",
} | {
  isActive: boolean,
  type: "TOGGLE_MENU",
} | {
  name: string,
  avatar: string,
  type: "FETCH_PROFILE",
};

export function login(userId: string, token: string): Dispatch<Action> {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      token,
      type: "LOGIN",
      userId,
    });
  };
}

export function logout(): Dispatch<Action> {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "LOGOUT",
    });
  };
}

export function toggleMenu(isActive: boolean): Dispatch<Action> {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      isActive,
      type: "TOGGLE_MENU",
    });
  };
}

export function fetchProfile(userId: string, token: string): Dispatch<Action> {
  return (dispatch: Dispatch<Action>) => {
    const apiUrl = "http://localhost:4000/api";
    const query = "?token=" + token + "&refreshToken=true&query=1/user/" + userId + "/profile.json";
    const fullUrl = apiUrl + query;
    axios.get(fullUrl)
      .then((response) => {
        dispatch({
          avatar: response.data.user.avatar640,
          name: response.data.user.fullName,
          type: "FETCH_PROFILE",
        });
      });
  };
}
