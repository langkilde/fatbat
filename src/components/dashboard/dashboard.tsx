import * as React from "react";
import {connect} from "react-redux";
import StatusToday from "./statusToday";

class Dashboard extends React.Component {
  
  public render() {
    return (
      <div className="dashboard">
        <StatusToday/>
      </div>
    );
  }
}

export default Dashboard;
