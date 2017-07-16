import * as React from "react";
import {connect} from "react-redux";
import Profile from "./profile";

class Header extends React.Component {
  
  public render() {
    return (
      <div className="header-container">
        <div className="header">
          <h1 className="header-title">Fatbat</h1>
          <Profile/>
        </div>
      </div>
    );
  }
}

export default Header;
