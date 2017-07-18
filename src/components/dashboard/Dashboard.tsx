import * as React from "react";
import {connect} from "react-redux";
import StatusToday from "./StatusToday";

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
