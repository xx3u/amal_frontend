import React, { useState } from 'react';
import { IconButton, makeStyles, TextField, Tooltip } from '@material-ui/core';
import { Search as SearchIcon, Clear } from '@material-ui/icons';

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

const Search = ({ searchHandler, dropSearchHandler }) => {
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

  const resetText = () => {
    setText((prev) => {
      return { ...prev, firstName: '', lastName: '' };
    });
  };

  return (
    <div className={classes.search}>
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
      <Tooltip title='Поиск'>
        <IconButton
          color='primary'
          onClick={() => {
            searchHandler(text.firstName, text.lastName);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Сброс'>
        <IconButton
          color='primary'
          onClick={() => {
            resetText();
            dropSearchHandler();
          }}
        >
          <Clear />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Search;
