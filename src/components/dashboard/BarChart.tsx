import {max} from "d3-array";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import * as React from "react";

interface IBarChart {
  data: number[];
  size: number[];
}

class BarChart extends React.Component<IBarChart, any> {
  private node: any;
  
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }
  
  public componentDidMount() {
    this.createBarChart();
  }
  
  public componentDidUpdate() {
    this.createBarChart();
  }
  
  public render() {
    return <div>Hej</div>;
    // return <svg ref={(node) => this.node = node} width={1000} height={500}/>;
  }
  
  private createBarChart() {
    const node = this.node;
    const dataMax = max(this.props.data);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]]);
    
    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .enter()
      .append("rect");
    
    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .exit()
      .remove();
    
    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .style("fill", "green")
      .attr("x", (d, i) => 0.12 * i)
      .attr("y", (d) => this.props.size[1] - yScale(d))
      .attr("height", (d) => yScale(d))
      .attr("width", 0.1);
  }
}

export default BarChart;
