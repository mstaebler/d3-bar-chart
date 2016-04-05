import React from 'react';
import d3 from 'd3';

export default class Layout extends React.Component{
    constructor(){
        super();
        this.state = {};
    }
    render(){
        const hundred = d3.format(100);
        return(
            <div>
                Hello World {hundred}
            </div>
        );
    }
}
