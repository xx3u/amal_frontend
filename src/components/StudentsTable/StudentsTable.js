import React from 'react';
import { DataGrid } from '@material-ui/data-grid';


const StudentsTable = ({rows, columns}) => (
    <div style={{ height: 620, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection/>
    </div>
)

export default StudentsTable