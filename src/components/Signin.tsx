import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Action, login} from "../actions/index";
import history from "../historyCreator";
import {Store} from "../store/store";

const queryString = require("query-string");

interface IOwnProps {
  location: {
    search: string;
  };
}

interface IConnectedState {
  authenticated: boolean;
}

interface IConnectedDispatch {
  login: (userId: string, token: string) => Dispatch<Action>;
}

class SigninComponent extends React.Component<IConnectedState & IConnectedDispatch & IOwnProps, {}> {
  
  public componentWillMount() {
    
    if (this.props.location.search) {
      const params = queryString.parse(this.props.location.search);
      this.props.login(params.user_id, params.access_token);
      history.push("/app");
    }
    
    if (this.props.authenticated) {
      history.push("/app");
    }
  }
  
  public render() {
    return (
      <div className="signin">
        <h1 className="signin-title">Fatbat</h1>
        <form className="signin-form" action="http://localhost:3000/auth">
          <button className="signin-button" type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: Store.All, ownProps: IOwnProps): IConnectedState => ({
  authenticated: state.login.authenticated,
});

const mapDispatchToProps = (dispatch: Dispatch<Store.All>): IConnectedDispatch => ({
  login: (userId: string, token: string) => dispatch(login(userId, token))});

export const Signin: React.ComponentClass<IOwnProps> = connect(mapStateToProps, mapDispatchToProps)(SigninComponent);
