import React from 'react';
import FileManagement from './FileManagement.js';
import {DefaultEffects} from '@fluentui/react';

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
      <p>update Second vis options</p>
      <FileManagement/>
    </div>
  );
}

export default Vis2;