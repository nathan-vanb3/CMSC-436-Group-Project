import React from 'react';
import FileManagement from './FileManagement.js';
import {DefaultEffects} from '@fluentui/react';

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
      <p>Third vis options here</p>
      <FileManagement/>
    </div>
  );
}

export default Vis3;