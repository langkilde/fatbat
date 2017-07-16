import * as React from "react";
import {connect} from "react-redux";
import {browserHistory, IInjectedProps} from "react-router";

interface IApplicationContainer extends IInjectedProps {
  authenticated: boolean;
  token: string;
  userId: string;
}

class ApplicationContainer extends React.Component<IApplicationContainer, any> {
  
  public render() {
    return (
      <div>
        <p>Application</p>
        <p>Token: {this.props.token}</p>
        <p>UserId: {this.props.userId}</p>
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
