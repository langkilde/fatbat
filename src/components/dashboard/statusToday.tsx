import * as React from "react";
import {connect} from "react-redux";
import {browserHistory, IInjectedProps} from "react-router";
import {bindActionCreators} from "redux";
import {fetchToday} from "../../actions/index";

interface IDataPoint {
  time: string;
  value: number;
}

interface IStatusToday extends IInjectedProps, IDataPoint {
  fetchToday: () => void;
  today: string;
  heartIntradayToday: {
    dataset: IDataPoint[];
  };
}

class StatusToday extends React.Component<IStatusToday, any> {
  
  public componentWillMount() {
    this.props.fetchToday();
  }
  
  public render() {
    console.log(this.props.heartIntradayToday);
    
    return (
      <div>
        some data from today coming soon!
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    heartIntradayToday: state.data.heartIntradayToday,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchToday}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusToday);
