import React from 'react';

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
      return this.props.selected ? <iframe title='SMILES 3D Model' className='structureViewer' src={'https://embed.molview.org/v1/?mode=balls&smiles=' + this.props.info['SMILES']}></iframe> : <p>No Species Selected.</p>
    }
  }
  
  class Properties extends React.Component {
    render() {
      return this.props.info
    };
  }

  export default InfoPort