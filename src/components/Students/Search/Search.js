import React, { useState } from 'react';
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
  const [text, setText] = useState({
    firstName: '',
    lastName: '',
  });

  const changeInput = (e) => {
    const { name, value } = e.target;
    setText((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className={classes.search}>
      <TextField
        name='lastName'
        className={classes.textField}
        label='Фамилия'
        variant='outlined'
        size='small'
        onChange={(e) => {
          changeInput(e);
        }}
        value={text.lastName}
      />
      <TextField
        name='firstName'
        className={classes.textField}
        label='Имя'
        variant='outlined'
        size='small'
        onChange={(e) => {
          changeInput(e);
        }}
        value={text.firstName}
      />
      <Button variant='contained'>Поиск</Button>
    </div>
  );
};

export default Search;
