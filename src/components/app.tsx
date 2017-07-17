import * as React from "react";
import {connect} from "react-redux";
import {browserHistory, IInjectedProps} from "react-router";
import Dashboard from "./dashboard/dashboard";
import Header from "./header/header";

interface IApplicationContainer extends IInjectedProps {
  authenticated: boolean;
  token: string;
  userId: string;
}

class ApplicationContainer extends React.Component<IApplicationContainer, any> {
  
  public render() {
    return (
      <div>
        <Header/>
        <Dashboard/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ApplicationContainer);
