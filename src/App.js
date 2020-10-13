import React from 'react';
import './App.css';
import {loadTheme, Pivot, PivotItem, DefaultButton, Panel,
        PanelType, DefaultEffects} from '@fluentui/react';
import {useBoolean} from '@uifabric/react-hooks';



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

function Vis1() {
  return(
    <div className='visPort'>
      <Vis1Display/>
      <Vis1Options/>
    </div>
  );
}

function Vis1Display() {
  return(
    <div className='visDisplay' style={{boxShadow: DefaultEffects.elevation4}}>
      <p>First vis will be displayed here</p>
    </div>
  );
}

function Vis1Options() {
  return(
    <div className='visOptions' style={{boxShadow: DefaultEffects.elevation8}}>
      <p>First vis options</p>
      <FileManagement/>
    </div>
  );
}

function Vis2() {
  return(
    <div className='visPort'>
      <Vis2Display/>
      <Vis2Options/>
    </div>
  );
}

function Vis2Display() {
  return(
    <div className='visDisplay' style={{boxShadow: DefaultEffects.elevation4}}>
      <p>Second vis will be displayed here</p>
    </div>
  );
}

function Vis2Options() {
  return(
    <div className='visOptions'>
      <p>Second vis options</p>
      <FileManagement/>
    </div>
  );
}

function Vis3() {
  return(
    <div className='visPort'>
      <Vis3Display/>
      <Vis3Options/>
    </div>
  );
}

function Vis3Display() {
  return(
    <div className='visDisplay' style={{boxShadow: DefaultEffects.elevation4}}>
      <p>Third vis will be displayed here</p>
    </div>
  );
}

function Vis3Options() {
  return(
    <div className='visOptions'>
      <p>Third vis options</p>
      <FileManagement/>
    </div>
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

function FileManagement() {
  const [isOpen, {setTrue: openPanel, setFalse: dismissPanel}] = useBoolean(false);

  return(
    <div>
      <DefaultButton text='Manage Files' onClick={openPanel}/>
      <Panel isLightDismiss isOpen={isOpen} type={PanelType.medium} headerText="File Management" onDismiss={dismissPanel}>
        <p>File info and options go here</p>
        <DefaultButton text="Add File"/>
      </Panel>
    </div>
  );
}


export default App;