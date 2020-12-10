import React from 'react';
import MaterialTable from 'material-table';
import Plotly from 'plotly.js';

class Vis2 extends React.Component{
  constructor(props) {
    super(props);

    this.state = {data: []};

    Plotly.d3.csv('https://raw.githubusercontent.com/nathan-vanb3/CMSC-436-Group-Project/master/compiled_data.csv', (err, rows) => {
      rows.forEach(function(row) {
        row['ID'] = +row['ID'];
        row['mib_vol'] = +row['mib_vol'];
        row['LogP_Jchem'] = +row['LogP_Jchem'];
        row['pKa_uncap'] = +row['pKa_uncap'];
      });

      console.log(rows)
      this.setState({data: rows});
    });
  }

  columns = [
    {field: 'ID', title: 'ID', sorting: false, filtering: false},
    {field: 'SMILES', title: 'SMILES', sorting: false},
    {field: 'mib_vol', title: 'mib_vol', searchable: false, type: 'numeric', customFilterAndSearch: (term, rowData) => Math.floor(term) == Math.floor(rowData.mib_vol)},
    {field: 'LogP_Jchem', title: 'LogP_Jchem', searchable: false, type: 'numeric', customFilterAndSearch: (term, rowData) => Math.floor(term) == Math.floor(rowData.LogP_Jchem)},
    {field: 'pKa_uncap', title: 'pKa_uncap', searchable: false, type: 'numeric', customFilterAndSearch: (term, rowData) => Math.floor(term) == Math.floor(rowData.pKa_uncap)},
    {field: 'Type', title: 'Type', searchable: false, sorting: false, lookup: {Abiotic: 'Abiotic', Computational: 'Computational', Coded: 'Coded'}}
  ]

  render() {
    return(
      <div classtitle='visPort'>
        <MaterialTable
          detailPanel = {
            row => {
              return(
                <iframe title='SMILES 3D Model Detail Card' width='100%' height='500' src={'https://embed.molview.org/v1/?mode=balls&smiles=' + row['SMILES']}></iframe>
              )
            }
          }
          columns={this.columns}
          data={this.state.data}
          options={{
            filtering: true,
            exportButton: true,
            paging: true,
            pageSizeOptions: [5, 8, 10, 15, 20, 1000],
            pageSize: 8
          }}
          localization = {{
            toolbar: {
              searchPlaceholder: 'ID or SMILES'
            }
          }}
          title = 'Amino Acid Data Table'
        />
      </div>
    );
  }
}

export default Vis2;