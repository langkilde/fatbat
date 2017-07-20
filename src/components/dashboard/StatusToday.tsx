import * as React from "react";

import {connect} from "react-redux";
import {browserHistory, IInjectedProps} from "react-router";
import {bindActionCreators} from "redux";
import {fetchToday} from "../../actions/index";
import BarChart from "./BarChart";

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
    if (this.props.heartIntradayToday) {
      console.log(this.props.heartIntradayToday);
      const values: number[] = this.props.heartIntradayToday.dataset.map((point) => point.value);
      
      
      return (
        <div>
          <BarChart data={values.slice(0, 9000)} size={[9000, 500]}/>
        </div>
      );
    }
    
    return (
      <div>
        Loading...
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
