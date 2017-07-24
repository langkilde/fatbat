import {createStore} from "redux";

import {reducers} from "../index";

describe("login reducer", () => {
  it("start unauthenticated", () => {
    const store = createStore(reducers);
    const {login} = store.getState();
    expect(login.authenticated).toEqual(false);
  });
});
