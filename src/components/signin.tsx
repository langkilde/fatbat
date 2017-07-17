import * as React from "react";
import {connect} from "react-redux";
import {browserHistory, IInjectedProps} from "react-router";
import {bindActionCreators} from "redux";
import {login} from "../actions/index";
import history from "../historyCreator";
const queryString = require("query-string");

interface ISignin extends IInjectedProps {
  authenticated: boolean;
  login: (userId: string, token: string) => boolean;
  location: string;
  token: string;
  userId: string;
}

class Signin extends React.Component<ISignin, any> {
  
  public componentWillMount() {
    console.log("mounting signin");
    console.log("signin token", this.props.token);
    console.log("signin userId", this.props.userId);
    
    if (this.props.location.search) {
      console.log("signing in using query params");
      const params = queryString.parse(this.props.location.search);
      console.log("userId :", params.user_id);
      console.log("token  :", params.access_token);
      this.props.login(params.user_id, params.access_token);
      history.push("/app");
    }
    
    if (this.props.authenticated) {
      console.log("already signed in, over to app");
      history.push("/app");
    }
  }
  
  public render() {
    console.log("rendering signin");
    
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

function mapStateToProps(state) {
  
  return {
    authenticated: state.auth.authenticated,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({login}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin);
