import React from 'react';
import FileManagement from './FileManagement.js';
import {DefaultEffects} from '@fluentui/react';

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

export default Vis1;