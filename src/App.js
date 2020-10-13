import React from 'react';
import './App.css';
import {loadTheme, Pivot, PivotItem, DefaultButton, Panel,
        PanelType, DefaultEffects} from '@fluentui/react';
import {useBoolean} from '@uifabric/react-hooks';
import FileManagement from './FileManagement.js';
import Vis1 from './Vis1.js';
import Vis2 from './Vis2.js';
import Vis3 from './Vis3.js';

function App() {
  return (
    <div className='masterContainer'>
      <VisPort/>
      <InfoPort/>
    </div>
  );
}

function VisPort() {
  return (
    <Pivot className='vis'>
      <PivotItem headerText='Vis 1'>
        <Vis1/>
      </PivotItem>
      <PivotItem headerText='Vis 2'>
        <Vis2/>
      </PivotItem>
      <PivotItem headerText='Vis 3'>
        <Vis3/>
      </PivotItem>
    </Pivot>
  );
}

function InfoPort() {
  return (
    <Pivot className='info'>
      <PivotItem headerText='Stucture'>
        <Structure/>
      </PivotItem>
      <PivotItem headerText='Properties'>
        <Properties/>
      </PivotItem>
      <PivotItem headerText='Additional'>
        <Additional/>
      </PivotItem>
    </Pivot>
  );
}

function Structure() {
  return(
    <div className='infoItem' style={{boxShadow: DefaultEffects.elevation4}}>
      <p>Structure will go here</p>
    </div>
  );
}

function Properties() {
  return(
    <div style={{boxShadow: DefaultEffects.elevation4}}>
      <p>Properties will go here</p>
    </div>
  );
}

function Additional() {
  return(
    <div style={{boxShadow: DefaultEffects.elevation4}}>
      <p>Additional info will go here</p>
    </div>
  );
}

export default App;
