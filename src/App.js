import React from 'react';
import './App.css';
import {Pivot, PivotItem} from '@fluentui/react';
import Vis1 from './Vis1.js';
import Vis2 from './Vis2.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProperties: '',
      showInfoPort: false,
      selected: false,
      selectedElement: null
    };

    this.updateSelected = this.updateSelected.bind(this);
    this.toggleInfoPort = this.toggleInfoPort.bind(this);
  };

  updateSelected(info) {
    var newElement = (
      <div>
        <p>ID: {info['ID']}</p>
        <p>SMILES: {info['SMILES']}</p>
        <p>mib_vol: {info['mib_vol']}</p>
        <p>LogP_Jchem: {info['LogP_Jchem']}</p>
        <p>pKa_uncap: {info['pKa_uncap']}</p>
      </div>
    );

    console.log('updating');

    this.setState(
      {
        selectedProperties: info,
        selected: true,
        selectedElement: newElement
      }
    );
  };

  toggleInfoPort() {
    this.state.showInfoPort ? this.setState({showInfoPort: false}) : this.setState({showInfoPort: true});
  }

  render() {
    return this.state.showInfoPort ?
      <div className='masterContainer'>
        <VisPort updateSelected={this.updateSelected} fill={!this.state.showInfoPort} toggleInfoPort={this.toggleInfoPort}/>
        <InfoPort properties={this.state.selectedProperties} selectedElement={this.state.selectedElement} selected={this.state.selected}/>
      </div> :
      <div className='masterContainer'>
        <VisPort updateSelected={this.updateSelected} fill={!this.state.showInfoPort} toggleInfoPort={this.toggleInfoPort}/>
      </div>
  };
}

class VisPort extends React.Component {
  constructor(props) {
    super(props);

    this.state = {fill: true};
  };

  render() {
    console.log(this.state.fill);

    return (
      <Pivot className={this.state.fill ? 'visFill' : 'vis'} onLinkClick={(item) => {
        if(item.key === '.0') {
          this.setState({fill: true});
          this.props.toggleInfoPort();
        }

        else {
          this.setState({fill: false});
          this.props.toggleInfoPort();
        }
      }}>
        <PivotItem headerText='Table'>
          <Vis2/>
        </PivotItem>
        <PivotItem headerText='SPLOM'>
          <Vis1 updateSelected={this.props.updateSelected}/>
        </PivotItem>
      </Pivot>
    );
  };
};

class InfoPort extends React.Component {
  render() {
    return (
      <div className='info'>
        <Structure selected={this.props.selected} info={this.props.properties}/>
        <Properties selected={this.props.selected} info={this.props.selectedElement}/>
      </div>   
    );
  };
};

class Structure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null
    }
  }

  render() {
    return this.props.selected ? <iframe className='structureViewer' src={'https://embed.molview.org/v1/?mode=balls&smiles=' + this.props.info['SMILES']}></iframe> : <p>No Species Selected.</p>
  }
}

class Properties extends React.Component {
  render() {
    return this.props.info
  };
}

export default App;
