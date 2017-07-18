import * as React from "react";
import {connect} from "react-redux";
import history from "../../historyCreator";

export default function(ComposedComponent) {
  
  interface IRequireAuth {
    authenticated: boolean;
  }
  
  class RequireAuth extends React.Component<IRequireAuth, any> {
    
    public render() {
      return <ComposedComponent {...this.props} />;
    }
    
    public componentWillMount() {
      if (!this.props.authenticated) {
        history.push("/");
      }
    }
    
    public componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        history.push("/");
      }
    }
    
  }
  
  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
  }
  
  return connect(mapStateToProps)(RequireAuth);
}
