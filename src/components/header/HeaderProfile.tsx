import * as React from "react";
import {connect} from "react-redux";
import {browserHistory, IInjectedProps} from "react-router";
import {bindActionCreators} from "redux";
import {fetchProfile} from "../../actions/index";

interface IProfile extends IInjectedProps {
  avatar640: string;
  fetchProfile: () => void;
  token: string;
  userId: string;
  fullName: string;
}

class HeaderProfile extends React.Component<IProfile, any> {
  
  public componentWillMount() {
    this.props.fetchProfile();
  }
  
  public render() {
    const userId = this.props.userId;
    const profileUrl = "https://www.fitbit.com/user/" + userId;
    const userName = this.props.fullName || "loading...";
    
    return (
      <div className="profile">
        <a className="header-profile-link" href={profileUrl} target="_blank">
          <p className="header-profile-name">{userName}</p>
          <img className="header-profile-avatar" src={this.props.avatar640} height="50px"/>
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.profile,
    userId: state.auth.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchProfile}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderProfile);
