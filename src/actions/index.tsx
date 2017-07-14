import {browserHistory} from "react-router";

export function login(userId, token) {
  console.log("in login action");
  
  return (dispatch) => {
    console.log("in action creator");
    dispatch({
      token,
      type: "store_fitbit_token",
      userId,
    });
  };
}
