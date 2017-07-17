import * as React from "react";
import {connect} from "react-redux";
import Menu from "./menu";
import Profile from "./profile";

class Header extends React.Component {
  
  public render() {
    return (
      <div className="header-container">
        <div className="header">
          <h1 className="header-title">Fatbat</h1>
          <Menu active="false"/>
          <Profile/>
        </div>
      </div>
    );
  }
}

export default Header;
