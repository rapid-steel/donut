export default function statusDonut(svg) {

  this.svg = d3.select( svg );
  this.donutWidth = 25;
  this.maxBarHeight = 200;
  this.padding = 2;
  this.styles = {
    barColor: '#40C4FF',
    donutColor: {
      ok: '#64FFDA',
      warning: '#FF4081'
    },
    bgArcColor: '#E5E4E4',
    fontSize: '50px'
  };


  this.init = function( object ) {

    console.log( object, this.svg );



    const scale = d3.scaleBand()
      .domain( object.data.map( d => d.key ) )
    .range([this.donutWidth, 400 - this.donutWidth ])
      .padding( this.padding );

    const circles = [{r: this.donutWidth * .75, color: 'black'}, {r: this.donutWidth * .2, color: 'white'}];

    this.arc = d3.arc()
      .innerRadius( 200 - this.donutWidth )
      .outerRadius( 200 );

    this.svg.select('defs')
      .append('clipPath')
      .attr('id', 'circle')
      .append('circle')
      .attr('cx', 200)
      .attr('cy', 200)
      .attr('r', 200 - this.donutWidth );

    this.bars = this.svg.select('#histo')
        .attr('clip-path', 'url(#circle)')
        .selectAll('.bar')
        .data( object.data )
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('x', d => scale( d.key ) )
    .attr('y', d =>  400 - this.donutWidth - d.value  * this.maxBarHeight )
    .attr('width', scale.step() - scale.padding() )
      .attr('height', d => d.value * this.maxBarHeight )
    .style('fill', this.styles.barColor );


    this.svg.select('#donut')
      .append('path')
      .attr( 'd', this.arc({startAngle: 0, endAngle: Math.PI * 2}) )
      .style('fill', d => this.styles.bgArcColor );


    this.donutArc = this.svg.select('#donut')
      .append('path')
      .attr( 'd', this.arc({startAngle: 0, endAngle: object.level / 50 * Math.PI}) )
      .style('fill',object.warning ? this.styles.donutColor.warning : this.styles.donutColor.ok );


    this.spot = this.svg.select('#donut').append('g')
      .attr('transform', `rotate(${object.level * 3.6})`);

    this.spot.selectAll('circle')
      .data( circles )
      .enter()
      .append('circle')
      .attr('cy', -200 + this.donutWidth / 2)
      .attr('r', d => d.r)
    .style('fill', d => d.color);

    this.text = this.svg.select('#donut')
      .append('text')
      .text(Math.round( object.level ) + ' %')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .style('font-size', this.styles.fontSize );

    return this;
  };



  this.plot = function (object) {


    this.bars
      .data( object.data )
      .transition( 500 )
      .attr('y', d =>  400 - this.donutWidth - d.value  * this.maxBarHeight )
    .attr('height', d => d.value * this.maxBarHeight );

    this.donutArc
      .style('fill',object.warning ? this.styles.donutColor.warning : this.styles.donutColor.ok )
      .attr( 'd', this.arc({startAngle: 0, endAngle: object.level / 50 * Math.PI }) );

    this.spot
      .transition( 1000 )
      .attr('transform', `rotate(${object.level * 3.6})`);

    this.spot.selectAll('circle')
      .transition(300)
      .attr('r', d => d.r * 1.05 )
    .transition(200)
      .attr('r', d => d.r * .95)
    .transition(200)
      .attr('r', d => d.r );

    this.text
      .text(Math.round( object.level ) + ' %');

    return this;

  };

  return this;
}