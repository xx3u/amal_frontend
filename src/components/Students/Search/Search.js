import React from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginBottom: theme.spacing(4),
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textField: {
    marginRight: theme.spacing(1),
  },
}));

const Search = () => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <TextField className={classes.textField} label='Фамилия' variant='outlined' size='small' />
      <TextField className={classes.textField} label='Имя' variant='outlined' size='small' />
      <Button variant='contained'>Поиск</Button>
    </div>
  );
};

export default Search;
