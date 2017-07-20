import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Menu from "./HeaderMenu";
import Profile from "./HeaderProfile";

interface IHeader {
  getMenuDropdown: () => void;
  active: boolean;
}

class Header extends React.Component<IHeader, any> {
  
  private static getMenuDropdown(active) {
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
    
    if (active) {
      
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
    const MENU_DROPDOWN = Header.getMenuDropdown(this.props.active);
    
    return (
      <div className="header-container">
        <div className="header">
          <Link to="/"><h1 className="header-title">FATBAT</h1></Link>
          <Menu active={false}/>
          <Profile/>
        </div>
        {MENU_DROPDOWN}
      </div>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    active: state.menu.active,
  };
}

export default connect(
  mapStateToProps,
)(Header);
