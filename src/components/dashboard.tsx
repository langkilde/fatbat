const queryString = require("query-string");
import * as React from "react";
import {connect} from "react-redux";
import {browserHistory, IInjectedProps} from "react-router";
import * as actions from "../actions";
import history from "../history";

interface IDashboard extends IInjectedProps {
  login: (userId: string, token: string) => void;
  location: string;
  token: string;
  userId: string;
}

class Dashboard extends React.Component<IDashboard, any> {
  
  public componentWillMount() {
    const params = queryString.parse(this.props.location.search);
    console.log("user_id:", params.user_id);
    console.log("token  :", params.access_token);
    this.props.login(params.user_id, params.access_token);
    history.push("/dashboard");
  }
  
  public render() {
    console.log("rendering dashboard");
    console.log("token", this.props.token);
    console.log("userId", this.props.userId);
    
    return (
      <div>
        Dashboard
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapping state to props");
  console.log("state", state);
  
  return {
    token: state.login.token,
    userId: state.login.userId,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(Dashboard);
