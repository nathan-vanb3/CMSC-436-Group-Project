import React, {Component} from 'react';
import FileManagement from './FileManagement.js';
import {DefaultEffects} from '@fluentui/react';
import data from './data.json';
var d3 = require('d3');

var fixed_data = Object.assign(data, {x: 'mib_vol', y: 'LogP_Jchem'})

function Vis1() {
  return(
    <div className='visPort'>
      <div className='visDisplay' style={{boxShadow: DefaultEffects.elevation4}}>
        <Visualization data={fixed_data} size={[1000,800]} />
      </div>
      <Vis1Options/>
    </div>
  );
}

class Visualization extends Component {
  constructor(props){
    super(props)
      this.createVisualization = this.createVisualization.bind(this)
  }
  componentDidMount() {
      this.createVisualization()
  }

  componentDidUpdate() {
      this.createVisualization()
  }

  createVisualization() {
    var padding = 20
    var columns = ['mib_vol', 'LogP_Jchem', 'pKa_uncap']
    var width = 1000
    var size = (width - (columns.length + 1) * padding) / columns.length + padding

    var x = columns.map(c => d3.scaleLinear()
      .domain(d3.extent(data, d => d[c]))
      .rangeRound([padding / 2, size - padding / 2]))

    var y = x.map(x => x.copy().range([size - padding / 2, padding / 2]))

    var z = d3.scaleOrdinal()
      .domain(data.map(d => d.type))
      .range(d3.schemeCategory10)

    const xAxis_const = d3.axisBottom()
        .ticks(6)
        .tickSize(size * columns.length);

    var xAxis = g => g.selectAll("g").data(x).join("g")
        .attr("transform", (d, i) => `translate(${i * size},0)`)
        .each(function(d) { return d3.select(this).call(xAxis_const.scale(d)); })
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));

    const yAxis_const = d3.axisLeft()
        .ticks(6)
        .tickSize(-size * columns.length);
        
    var yAxis = g => g.selectAll("g").data(y).join("g")
        .attr("transform", (d, i) => `translate(0,${i * size})`)
        .each(function(d) { return d3.select(this).call(yAxis_const.scale(d)); })
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));

    const svg = d3.select(this.node)
        .attr("viewBox", `${-padding} 0 ${width} ${width}`)
        .style('position', 'relative')
        .style("width", "100%")
        .style("height", "100%")
        .call(d3.zoom().on('zoom', function(event, d) {
          svg.attr('transform', event.transform)
        }))
        .append('g');

    var div = d3.select('body')
        .append('div')
        .attr('class','tooltip')
        .style('opacity', 0);
  
    svg.append("g")
        .call(xAxis);
  
    svg.append("g")
        .call(yAxis);
  
    const cell = svg.append("g")
      .selectAll("g")
      .data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
      .join("g")
        .attr("transform", ([i, j]) => `translate(${i * size},${j * size})`);
  
    cell.append("rect")
        .attr("fill", "none")
        .attr("stroke", "#aaa")
        .attr("x", padding / 2 + 0.5)
        .attr("y", padding / 2 + 0.5)
        .attr("width", size - padding)
        .attr("height", size - padding);
  
    cell.each(function([i, j]) {
      d3.select(this).selectAll("circle")
        .data(data.filter(d => !isNaN(d[columns[i]]) && !isNaN(d[columns[j]])))
        .join("circle")
          .attr("cx", d => x[i](d[columns[i]]))
          .attr("cy", d => y[j](d[columns[j]]))
          .on("mouseover", function(event, d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.html("ID: " + d.ID + "<br/>" + "SMILES: " + d.SMILES + "<br/>" + "mib_vol: " + d.mib_vol + "<br/>" + "LogP_Jchem: " + d.LogP_Jchem)
                .style("left", (event.pageX) + "px")		
                .style("top", (event.pageY - 28) + "px");	
            })					
          .on("mouseout", function(d) {		
              div.transition()		
                  .duration(500)		
                  .style("opacity", 0);	
          });
    });
  
    const circle = cell.selectAll("circle")
        .attr("r", 3.5)
        .attr("fill-opacity", 0.7)
        .attr("fill", d => z(d.type));
  
    svg.append("g")
        .style("font", "bold 10px sans-serif")
      .selectAll("text")
      .data(columns)
      .join("text")
        .attr("transform", (d, i) => `translate(${i * size},${i * size})`)
        .attr("x", padding)
        .attr("y", padding)
        .attr("dy", ".71em")
        .text(d => d);
 }

  render() {
    return <svg ref={node => this.node = node}>
    </svg>
  }
}

function Vis1Options() {
  return(
    <div className='visOptions' style={{boxShadow: DefaultEffects.elevation8}}>
      <p>First vis options</p>
      <FileManagement/>
    </div>
  );
}

export default Vis1;