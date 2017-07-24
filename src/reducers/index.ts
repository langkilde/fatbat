import {combineReducers} from "redux";
import {Action} from "../actions/index";
import {COOKIE_TOKEN, COOKIE_USER_ID} from "../constants";
import {Store} from "../store/store";

const initialLoginState: Store.Login = {
  authenticated: false,
};

const initialMenuState: Store.Menu = {
  isActive: false,
};

const initialProfileState: Store.Profile = {
  avatar: "https://image.flaticon.com/icons/svg/149/149448.svg",
  name: "loading...",
};

function login(state: Store.Login = initialLoginState, action: Action): Store.Login {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(COOKIE_USER_ID, action.userId);
      localStorage.setItem(COOKIE_TOKEN, action.token);
      
      return {
        authenticated: true,
        token: action.token,
        userId: action.userId,
      };
  }
  
  return state;
}

function menu(state: Store.Menu = initialMenuState, action: Action): Store.Menu {
  switch (action.type) {
    case "TOGGLE_MENU":
      
      if (!action.isActive) {
        
        return {...state, isActive: true};
      }
      
      return {...state, isActive: false};
  }
  
  return state;
}

function profile(state: Store.Profile = initialProfileState, action: Action): Store.Profile {
  switch (action.type) {
    case "FETCH_PROFILE":
      
      return {...state, avatar: action.avatar, name: action.name };
  }
  
  return state;
}

export const reducers = combineReducers<Store.All>({
  login,
  menu,
  profile,
});
