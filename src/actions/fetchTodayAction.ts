import axios from "axios";
import {COOKIE_TOKEN, FETCH_TODAY} from "./actionTypes";

export function fetchToday() {
  return (dispatch) => {
    console.log("fetching profile");
    const token = localStorage.getItem(COOKIE_TOKEN);
    const apiUrl = "http://localhost:4000/api";
    const query = "1/user/-/activities/heart/date/2017-07-17/1d/1sec.json";
    const params = "?token=" + token + "&refreshToken=true&query=" + query;
    const fullUrl = apiUrl + params;
    axios.get(fullUrl)
      .then((response) => {
        dispatch({
          ...response.data,
          type: FETCH_TODAY,
        });
      });
    
  };
}
