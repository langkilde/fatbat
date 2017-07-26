import * as React from "react";
import {connect} from "react-redux";
import * as redux from "redux";
import {Action, logout} from "../../actions/index";
import {Store} from "../../store/store";
import HeaderMenu from "./HeaderMenu";
import HeaderProfile from "./HeaderProfile";

interface IOwnProps {
  isActive: boolean;
}

interface IConnectedState {
  authenticated: boolean;
  isActive: boolean;
}

interface IConnectedDispatch {
  logout: () => Action;
}

class Header extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, any> {
  
  constructor(props: IOwnProps & IConnectedState & IConnectedDispatch) {
    super(props);
    this.loggingOut = this.loggingOut.bind(this);
  }
  
  public loggingOut() {
    this.props.logout();
  }
  
  public getMenuDropdown(isActive: boolean) {
    const MENU_ITEMS = (
      <div>
        <div className="dropdown-menu-item">
          <input
            className="dropdown-menu-button"
            id="signout"
            type="button"
            value="Sign out"
            onClick={this.loggingOut}
          />
        </div>
      </div>
    );

    if (isActive) {

      return (
        <div className="dropdown-is-active menu-dropdown-content">
          {MENU_ITEMS}
        </div>
      );
    }

    return (
      <div className="menu-dropdown-content">
        {MENU_ITEMS}
      </div>
    );
  }
  
  public render() {
    const MENU_DROPDOWN = this.getMenuDropdown(this.props.isActive);
    
    return (
      <div className="header-container">
        <div className="header">
          <h1 className="header-title">Fatbat</h1>
          <HeaderMenu />
          <HeaderProfile/>
        </div>
        {MENU_DROPDOWN}
      </div>
    );
  }
}

const mapStateToProps = (state: Store.All, ownProps: {}): IConnectedState => ({
  authenticated: state.auth.authenticated,
  isActive: state.menu.isActive,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): IConnectedDispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
