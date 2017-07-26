import {createStore} from "redux";
import {reducers} from "../index";

describe("auth reducer", () => {
  it("start unauthenticated", () => {
    const store = createStore(reducers);
    const {auth} = store.getState();
    expect(auth.authenticated).toEqual(false);
  });
  
  it("sets authenticated to true when logging in", () => {
    const store = createStore(reducers);
    store.dispatch({type: "LOGIN", userId: "test_user_id", token: "test_token"});
    const {auth} = store.getState();
    expect(auth.authenticated).toEqual(true);
  });
  
  it("sets userId and token correctly logging in", () => {
    const store = createStore(reducers);
    const userId = "test_user_id";
    const token = "test_token";
    store.dispatch({type: "LOGIN", userId, token});
    const {auth} = store.getState();
    expect(auth.userId).toEqual(userId);
    expect(auth.token).toEqual(token);
  });
  
  it("sets authenticated to false when logging out", () => {
    const store = createStore(reducers);
    store.dispatch({type: "LOGIN", userId: "test_user_id", token: "test_token"});
    store.dispatch({type: "LOGOUT"});
    const {auth} = store.getState();
    expect(auth.authenticated).toEqual(false);
  });
  
});
