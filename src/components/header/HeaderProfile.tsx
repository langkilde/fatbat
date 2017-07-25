import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Action, fetchProfile} from "../../actions/index";
import {Store} from "../../store/store";

interface IConnectedState {
  avatar: string;
  name: string;
  token?: string;
  userId?: string;
}

interface IConnectedDispatch {
  fetchProfile: (userId: string, token: string) => Action;
}

class HeaderProfile extends React.Component<{} & IConnectedState & IConnectedDispatch, {}> {
  
  public componentWillMount() {
    if (this.props.userId && this.props.token) {
      this.props.fetchProfile(this.props.userId, this.props.token);
    }
  }
  
  public render() {
    const userId = this.props.userId;
    const profileUrl = "https://www.fitbit.com/user/" + userId;
    const userName = this.props.name;
    
    return (
      <div className="profile">
        <p className="header-profile-name desktop-only">{userName}</p>
        <a className="header-profile-link" href={profileUrl} target="_blank">
          <img className="header-profile-avatar" src={this.props.avatar} height="50px"/>
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state: Store.All, ownProps: {}): IConnectedState => ({
  avatar: state.profile.avatar,
  name: state.profile.name,
  token: state.login.token,
  userId: state.login.userId,
});

const mapDispatchToProps = (dispatch: Dispatch<Store.All>): IConnectedDispatch => ({
  fetchProfile: (userId: string, token: string) => dispatch(fetchProfile(userId, token))});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderProfile);
