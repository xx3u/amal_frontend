import React from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    height: '100%',
    minWidth: 650,
  },
  tableFooter: {
    height: theme.spacing(3),
  },
}));

const TableWithCard = ({ rows, columns }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return <TableCell key={col.id}>{col.headerName}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ? rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((field) => {
                    return (
                      <TableCell key={`${index}${field.id}`}>
                        {field.renderCell ? field.renderCell(row[field.id]) : row[field.id].toString()}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            : null}
        </TableBody>
        <TableFooter className={classes.tableFooter} />
      </Table>
    </TableContainer>
  );
};

export default TableWithCard;
