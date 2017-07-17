import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {toggleMenu} from "../../actions/toggleMenuAction";

interface IMenu {
  active: string;
  toggleMenu: (menuIsActive: boolean) => void;
  toggleMenuState: () => void;
}

class Menu extends React.Component<IMenu, any> {
  
  constructor(props) {
    super(props);
    this.toggleMenuState = this.toggleMenuState.bind(this);
  }
  
  public render() {
    let buttonClass = "hamburger hamburger--collapse header-menu";
    if (this.props.active) {
      buttonClass += " is-active";
    }
    
    return (
      <button className={buttonClass} onClick={this.toggleMenuState} type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"/>
        </span>
      </button>
    );
  }
  
  public toggleMenuState() {
    if (this.props.active === "true") {
      this.props.toggleMenu(true);
    } else if (this.props.active) {
      this.props.toggleMenu(true);
    } else {
      this.props.toggleMenu(false);
    }
  }
  
}

function mapStateToProps(state) {
  return {
    active: state.menu.active,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleMenu}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
