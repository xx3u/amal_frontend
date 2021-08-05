import React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import CustomCard from '../CustomCard/CustomCard';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TableWithCard = ({ rows, columns, onClickHandler }) => {
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
                    if (typeof row[col.field] === 'string') {
                      return <TableCell key={`${index}${col.field}`}>{row[col.field]}</TableCell>;
                    } else {
                      return (
                        <TableCell key={`${index}${col.field}`}>
                          <CustomCard
                            id={row[col.field].id}
                            subject={row[col.field].subject}
                            teacher={row[col.field].teacher}
                            onClickHandler={onClickHandler}
                            startTime={row[col.field].startTime}
                            endTime={row[col.field].endTime}
                          />
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
