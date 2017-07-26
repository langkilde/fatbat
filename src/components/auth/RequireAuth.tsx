import * as React from "react";
import * as ReactRedux from "react-redux";
import history from "../../historyCreator";

export interface IRequireAuthProps {
  authenticated: boolean;
}

type HOC<PWrapped, PHoc> = React.ComponentClass<PWrapped & PHoc> | React.SFC<PWrapped & PHoc>;

export function requireAuth<P, StateProps>(Component: HOC<P, IRequireAuthProps>): React.ComponentClass<P> {
  
  class RequiresAuth extends React.Component<P & ReactRedux.DispatchProp<any> & IRequireAuthProps> {
    
    public render(): JSX.Element {
      return <Component authenticated={this.props.authenticated} {...this.state} />;
    }
    
    public componentWillMount() {
      if (!this.props.authenticated) {
        history.push("/");
      }
    }
    
    public componentWillUpdate() {
      if (!this.props.authenticated) {
        history.push("/");
      }
    }
    
    public componentWillReceiveProps() {
      if (!this.props.authenticated) {
        history.push("/");
      }
    }
    
    public shouldComponentUpdate(nextProps: any, nextState: any) {
      if (!nextProps.authenticated) {
        history.push("/");
      }
      
      return !nextProps.authenticated;
    }
    
  }
  
  function mapStateToProps(state: any, ownProps: P): IRequireAuthProps {
    return {
      authenticated: state.auth.authenticated,
    };
  }
  
  return ReactRedux.connect(mapStateToProps)(RequiresAuth);
  
}

export default requireAuth;
