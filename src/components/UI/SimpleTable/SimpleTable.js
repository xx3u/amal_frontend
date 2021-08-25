import React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SimpleTable = ({ rows, columns }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return (
                <TableCell align='center' key={col.field}>
                  {col.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ? rows.map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((col) => {
                    return (
                      <TableCell align='center' key={`${row.id}${col.field}`}>
                        {col.renderCell ? col.renderCell(row[col.field], row) : row[col.field]?.toString()}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
