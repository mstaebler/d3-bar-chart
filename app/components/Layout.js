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

    //Width and height
    var w = 500;
    var h = 100;
    var barPadding = 1;

    //Create SVG element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    svg.selectAll("rect")
               .data(data)
               .enter()
               .append("rect")
               .attr("x", 0)
               .attr("y", 0)
               .attr("width", 20)
               .attr("height", 100)
.attr("x", function(d, i) {
    return i * (w / data.length);
})
.attr("height", function(d) {
    return d * 4;  // <-- Times four!
})
.attr("y", function(d) {
    return h - d;  //Height minus data value
});

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
            <div className="chart">

            </div>
        );
    }
}
