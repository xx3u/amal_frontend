import React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    height: '100%',
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
              return <TableCell key={col.fieldId}>{col.headerName}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ? rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((field) => {
                    if (typeof row[field.fieldId] === 'string') {
                      return <TableCell key={`${index}${field.fieldId}`}>{row[field.fieldId]}</TableCell>;
                    } else {
                      return (
                        <TableCell key={`${index}${field.fieldId}`}>
                          {field.renderCell && field.renderCell(row[field.fieldId])}
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
