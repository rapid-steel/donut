import React, {Component} from 'react'
import statusDonut from '../assets/statusDonut';
import dataGenerator from '../assets/dataGenerator';

const styles = {
  width: '100%',
  height: '100%'
};

export default class Chart extends Component {

  componentDidMount() {
    let svg = new statusDonut('#d3')
      .init( dataGenerator.apply( dataGenerator ) );


    function tick() {
      setTimeout(function () {

        svg.plot(dataGenerator.apply( dataGenerator ));
        tick();
      }, 3000)
    }

    tick();

  }




  render() {
    return (
      <div>
        <svg style={ styles } id="d3"
             version="1.1"
             baseProfile="full"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 440 440">
          <defs>
          </defs>
          <g transform="translate(20,20)">
            <g id="histo"></g>
            <g id="donut" transform="translate(200,200)"></g>
          </g>
        </svg>
      </div>
    )

  }
}