import React from 'react';
import './App.css';
import {loadTheme, Pivot, PivotItem, DefaultButton, Panel,
        PanelType, DefaultEffects} from '@fluentui/react';
import {useBoolean} from '@uifabric/react-hooks';
import FileManagement from './FileManagement.js';
import Vis1 from './Vis1.js';
import Vis2 from './Vis2.js';
import Vis3 from './Vis3.js';

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
        <br/>
        <p>SMILES: {info['SMILES']}</p>
        <br/>
        <p>mib_vol: {info['mib_vol']}</p>
        <br/>
        <p>LogP_Jchem: {info['LogP_Jchem']}</p>
        <br/>
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
    return (
      <div className='masterContainer'>
        <VisPort updateSelected={this.updateSelected} fill={!this.state.showInfoPort} toggleInfoPort={this.toggleInfoPort}/>

        {this.state.showInfoPort 
          ? <InfoPort properties={this.state.selectedProperties} selectedElement={this.state.selectedElement} selected={this.state.selected}/>
          : null
        }
        
      </div>
    );
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
        <PivotItem headerText='Clustering'>
          <Vis3/>
        </PivotItem>
      </Pivot>
    );
  };
};

class InfoPort extends React.Component {
  render() {
    return (
      <Pivot className='info'>
        <PivotItem headerText='Properties'>
          <Properties selected={this.props.selected} info={this.props.selectedElement}/>
        </PivotItem>
        <PivotItem headerText='Stucture'>
          <Structure selected={this.props.selected} info={this.props.properties}/>
        </PivotItem>
        <PivotItem headerText='Additional'>
          <Additional/>
        </PivotItem>
      </Pivot>
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
    return(
      <div id='structure' className='infoItem' style={{boxShadow: DefaultEffects.elevation4}}>
        {this.props.selected ? <iframe className='structureViewer' src={'https://embed.molview.org/v1/?mode=balls&smiles=' + this.props.info['SMILES']}></iframe> : <p>No Species Selected.</p>}
      </div>
    );
  }
}

class Properties extends React.Component {
  render() {
    return(
      <div id='properties' className='infoItem' style={{boxShadow: DefaultEffects.elevation4}}>
        {this.props.selected ? this.props.info : <p>No Species Selected.</p>}
      </div>
    );
  };
}

function Additional() {
  return(
    <div id='additional' className='infoItem' style={{boxShadow: DefaultEffects.elevation4}}>
      <p>Additional info will go here</p>
    </div>
  );
}

export default App;
