import React from 'react';
import FileManagement from './FileManagement.js';
import {DefaultEffects, ScrollablePane} from '@fluentui/react';
import ReactFlexyTable from 'react-flexy-table';
import data from './data.json';
import 'react-flexy-table/dist/index.css';

function Vis2() {
  return(
    <div className='visPort'>
      <ScrollablePane style={{boxShadow: DefaultEffects.elevation4}}>
        <ReactFlexyTable data={data} pageSize={10} pageSizeOptions={[10, 15, 20, 50, 100, 200, 500, 1000]} sortable filterable globalSearch/>
      </ScrollablePane>
    </div>
  );
}

export default Vis2;