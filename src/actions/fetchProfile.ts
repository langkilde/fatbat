import axios from "axios";
import {COOKIE_TOKEN, COOKIE_USER_ID, FETCHED_PROFILE} from "./types";

export function fetchProfile() {
  return (dispatch) => {
    console.log("fetching profile");
    const token = localStorage.getItem(COOKIE_TOKEN);
    const userId = localStorage.getItem(COOKIE_USER_ID);
    axios.get("http://localhost:4000/api?token=" + token + "&query=1/user/" + userId + "/profile.json")
      .then((response) => {
        console.log(response);
        dispatch({
          ...response.data.user,
          type: FETCHED_PROFILE,
        });
      });
  };
}
