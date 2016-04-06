import React from 'react';
import d3 from 'd3';
import $ from 'jquery';

export default class Layout extends React.Component{
    constructor(){
        super();

        this.state = {id: "test"};
    }
    componentDidMount() {
    this.serverRequest = $.get(this.props.source, function (res) {
      var result = JSON.parse(res);
      var data = result.data.reduce(function(all,item,index){
          all.push(item[1]);
          return all;
    },[]);

    var width = 420,
    barHeight = 20;

    var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

    var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

    bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });

      this.setState({
        id: result.id
      });
    }.bind(this));
    }
    componentWillUnmount() {
    this.serverRequest.abort();
    }
    render(){

        return(
            <svg className="chart">

            </svg>
        );
    }
}
