import React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import CustomCard from '../CustomCard/CustomCard';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TableWithCard = ({ rows, columns }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return <TableCell key={col.field}>{col.headerName}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ? rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((col) => {
                    console.log('row[col.field]: ', row[col.field]);
                    if (typeof row[col.field] === 'string') {
                      return <TableCell key={`${index}${col.field}`}>{row[col.field]}</TableCell>;
                    } else {
                      const values = Object.keys(row[col.field])
                        ? Object.keys(row[col.field]).map((key) => {
                            return row[col.field][key];
                          })
                        : ['', '', ''];
                      return (
                        <TableCell key={`${index}${col.field}`}>
                          <CustomCard id={values[0]} value1={values[1]} value2={values[2]} />
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableWithCard;
