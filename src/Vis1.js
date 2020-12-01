import React, {Component} from 'react';
import Plotly from 'plotly.js';

class Vis1 extends Component {
  render() {
    return(
      <div className='visPort'>
          <Visualization updateSelected={this.props.updateSelected}/>
      </div>
    );
  };
};

class Visualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousColor: '',
      previousSelection: ''
    }
 }

 componentDidMount() {
    Plotly.d3.csv('https://raw.githubusercontent.com/nathan-vanb3/CMSC-436-Group-Project/master/compiled_data.csv', (err, rows) => {

       function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
       }

       var colors = []
       for (var i=0; i < unpack(rows, 'Type').length; i++) {
          if (unpack(rows, 'Type')[i] === "Coded") {
          colors.push('purple')
          } else if (unpack(rows, 'Type')[i] === "Computational") {
          colors.push('green')
          } else if (unpack(rows, 'Type')[i] === "Abiotic") {
          colors.push('blue')
          }
       }

       var sizes = new Array(rows.length).fill(7)
       console.log(sizes);

       var axis = () => ({
          showline:false,
          zeroline:false,
          gridcolor:'#ffff',
          ticklen:4
       })

       var data = [{
          type: 'splom',
          dimensions: [
          {label:'mib_vol', values:unpack(rows,'mib_vol')},
          {label:'LogP_Jchem', values:unpack(rows,'LogP_Jchem')},
          {label:'pKa_uncap', values:unpack(rows,'pKa_uncap')},
          ],
          text: unpack(rows, 'SMILES'),
          marker: {
          color: colors,
          size: sizes,
          line: {
             color: 'white',
             width: 0.5
          }
          }
       }]

       var layout = {
          autosize: true,
          margin: {
            l: 55,
            r: 0,
            b: 55,
            t: 35,
            pad: 4
          },
          hovermode:'closest',
          dragmode:'select',
          plot_bgcolor:'rgba(240,240,240, 0.95)',
          xaxis:axis(),
          yaxis:axis(),
          xaxis2:axis(),
          xaxis3:axis(),
          yaxis2:axis(),
          yaxis3:axis(),
       }

       var config = {
          responsive: true
       }

       Plotly.react('myDiv', data, layout, config)

       var myDiv = document.getElementById('myDiv');
       myDiv.on('plotly_click', (data) => {
          var pn='',
             tn='',
             colors=[],
             sizes=[];

          for(var i=0; i < data.points.length; i++){
             pn = data.points[i].pointNumber;
             tn = data.points[i].curveNumber;
             colors = data.points[i].data.marker.color;
             sizes = data.points[i].data.marker.size;
          };

          var tempColor = colors[pn];
          colors[pn] = 'red';
          sizes[pn] = 10;

          if(this.previousColor !== '') {
             colors[this.state.previousSelection] = this.state.previousColor;
             sizes[this.state.previousSelection] = 7;
          }

          var update = {'marker':{color: colors, size: sizes, line: {color: 'white', width: 0.5}}};
          Plotly.restyle('myDiv', update, [tn]);

          this.setState({previousColor: tempColor});
          this.setState({previousSelection: pn});
          this.props.updateSelected(rows[pn]);
       })

    });
 }

 render() {
    return(
       <div id='myDiv'></div>
    )
 }
}

export default Vis1;