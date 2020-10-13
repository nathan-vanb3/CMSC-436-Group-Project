import React from 'react';
import {useBoolean} from '@uifabric/react-hooks';
import {DefaultButton, Panel, PanelType } from '@fluentui/react';

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

export default FileManagement;