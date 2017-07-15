const queryString = require("query-string");
import axios from "axios";
import * as React from "react";
import {connect} from "react-redux";
import {browserHistory, IInjectedProps} from "react-router";
import * as actions from "../actions";
import history from "../historyCreator";

interface IDashboard extends IInjectedProps {
  login: (userId: string, token: string) => void;
  location: string;
  token: string;
  userId: string;
}

class Dashboard extends React.Component<IDashboard, any> {
  
  public componentWillMount() {
    if (!this.props.location.search) {
      console.log("will not redirect");
    } else {
      const params = queryString.parse(this.props.location.search);
      console.log("user_id:", params.user_id);
      console.log("token  :", params.access_token);
      if (!params.user_id || !params.access_token) {
        console.log("invalid parameters");
      } else {
        this.props.login(params.user_id, params.access_token);
        history.push("/dashboard");
      }
    }
  }
  
  public render() {
    console.log("rendering dashboard");
    const localUserId = localStorage.getItem("fatbatUserId");
    console.log("localstorage userId", localUserId);
    const localToken = localStorage.getItem("fatbatToken");
    console.log("localstorage token", localToken);
  
    axios.get("http://localhost:4000/api?userId=apa&token=bepa&query=cepa")
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  
    if (!localUserId || !localToken) {
    
      return (
        <div>
          Not logged in
        </div>
      );
    }
    
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
