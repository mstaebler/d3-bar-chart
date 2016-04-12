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
      var dataset = result.data.reduce(function(all,item,index){
          all.push(item[1]);
          return all;
    },[]);

    //Width and height
    var w = 1200;
    var h = 900;
    var barPadding = 1;

    //Create SVG element
    var svg = d3.select("span")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return i * (w / dataset.length);
    })
    .attr("y", function(d) {
        return h - d;
    })
    .attr("width", w / dataset.length - barPadding)
    .attr("height", function(d) {
        return d;
    })
    .attr("fill", function(d) {
        return "rgb(0, 0, " + (d * 10) + ")";
    });

    svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
        return d;
   })
   .attr("x", function(d, i) {
        return i * (w / dataset.length) + 5;  // +5
   })
   .attr("y", function(d) {
        return h - (d) + 15;              // +15
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white")
   .attr("text-anchor", "middle");

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
            <span className="chart">

            </span>
        );
    }
}
