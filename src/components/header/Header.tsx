import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Menu from "./HeaderMenu";
import Profile from "./HeaderProfile";


class Header extends React.Component {
  
  public render() {
    return (
      <div className="header-container">
        <div className="header">
          <Link to="/"><h1 className="header-title">FATBAT</h1></Link>
          <Menu active="false"/>
          <Profile/>
        </div>
      </div>
    );
  }
}

export default Header;
