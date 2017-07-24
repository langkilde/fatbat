import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Store} from "../../store/store";
import HeaderMenu from "./HeaderMenu";
import HeaderProfile from "./HeaderProfile";

// import Profile from "./HeaderProfile";

interface IOwnProps {
  isActive: boolean;
}

interface IConnectedState {
  isActive: boolean;
}

class Header extends React.Component<IOwnProps & IConnectedState & {}, any> {
  
  private static getMenuDropdown(isActive: boolean) {
    const MENU_ITEMS = (
      <div>
        <div className="dropdown-menu-item">
          <p >the first item</p>
        </div>
        <div className="dropdown-menu-item">
          <p >the second item</p>
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
    const MENU_DROPDOWN = Header.getMenuDropdown(this.props.isActive);
    
    return (
      <div className="header-container">
        <div className="header">
          <Link to="/"><h1 className="header-title">FATBAT</h1></Link>
          <HeaderMenu />
          <HeaderProfile/>
        </div>
        {MENU_DROPDOWN}
      </div>
    );
  }
}

const mapStateToProps = (state: Store.All, ownProps: {}): IConnectedState => ({
  isActive: state.menu.isActive,
});

export default connect(mapStateToProps, {})(Header);
