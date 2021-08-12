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
                  {columns.map(({ field }) => {
                    if (typeof row[field] === 'string') {
                      return <TableCell key={`${index}${field}`}>{row[field]}</TableCell>;
                    } else {
                      return (
                        <TableCell key={`${index}${field}`}>
                          <CustomCard
                            id={row[field] ? row[field].id : ''}
                            subject={row[field] ? row[field].subject : ''}
                            teacher={row[field] ? row[field].teacher : ''}
                            group={row[field] ? row[field].group : ''}
                            onClickHandler={() => {
                              onClickHandler(row[field].startTime, row[field].endTime);
                            }}
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
