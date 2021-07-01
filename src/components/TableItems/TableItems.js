import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles({
  tableItem: {
    height: 620,
    width: '100%' 
  }
})

const TableItems = ({rows, columns}) => {
  const classes = useStyles();
  return (
    <div className={classes.tableItem}>
      <DataGrid rows={rows} columns={columns}/>
    </div>
)}

export default TableItems