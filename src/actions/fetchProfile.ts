import axios from "axios";
import {COOKIE_TOKEN, COOKIE_USER_ID, FETCHED_PROFILE} from "./types";

export function fetchProfile() {
  return (dispatch) => {
    console.log("fetching profile");
    const token = localStorage.getItem(COOKIE_TOKEN);
    const userId = localStorage.getItem(COOKIE_USER_ID);
    const apiUrl = "http://localhost:4000/api";
    const query = "?token=" + token + "&refreshToken=true&query=1/user/" + userId + "/profile.json";
    const fullUrl = apiUrl + query;
    axios.get(fullUrl)
      .then((response) => {
        console.log(response);
        dispatch({
          ...response.data.user,
          type: FETCHED_PROFILE,
        });
      });
  };
}
