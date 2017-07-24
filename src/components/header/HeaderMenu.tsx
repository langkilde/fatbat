import * as React from "react";
import {connect} from "react-redux";
import * as redux from "redux";
import {Action, toggleMenu} from "../../actions/index";
import {Store} from "../../store/store";

interface IOwnProps {
  isActive: boolean;
}

interface IConnectedState {
  isActive: boolean;
}

interface IConnectedDispatch {
  toggleMenu: (isActive: boolean) => Action;
}

class HeaderMenu extends React.Component<IOwnProps & IConnectedState & IConnectedDispatch, any> {
  
  constructor(props: IOwnProps & IConnectedState & IConnectedDispatch) {
    super(props);
    this.toggleMenuState = this.toggleMenuState.bind(this);
  }
  
  public render() {
    let buttonClass = "hamburger hamburger--collapse header-menu";
    if (this.props.isActive) {
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
    if (this.props.isActive === true) {
      this.props.toggleMenu(true);
    } else if (this.props.isActive) {
      this.props.toggleMenu(true);
    } else {
      this.props.toggleMenu(false);
    }
  }
  
}

const mapStateToProps = (state: Store.All, ownProps: {}): IConnectedState => ({
  isActive: state.menu.isActive,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): IConnectedDispatch => ({
  toggleMenu: (isActive: boolean) => dispatch(toggleMenu(isActive))});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderMenu);
