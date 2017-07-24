import * as React from "react";
import {IRequireAuthProps} from "./auth/RequireAuth";
import Dashboard from "./dashboard/Dashboard";
import Header from "./header/Header";

export class App extends React.Component<{} & IRequireAuthProps, {}> {
  
  public render() {
    return (
      <div>
        <Header/>
        <Dashboard/>
      </div>
    );
  }
}
