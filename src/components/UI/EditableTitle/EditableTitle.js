import React, { useEffect, useRef, useState } from 'react';
import { Grid, IconButton, TextField, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

const EditableTitle = ({
  value,
  onClickSave = () => {},
  required,
  title = {
    props: {
      variant: 'h6',
      component: 'p',
    },
  },
}) => {
  const [editDisable, setEditEnable] = useState(true);
  const [textValue, setTextValue] = useState(value);
  const prevTextValue = useRef(textValue);

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditEnable(!editDisable);
    if (!editDisable && value !== textValue) {
      onClickSave(textValue);
      setTextValue(prevTextValue.current);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setTextValue(e.target.value);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <form onSubmit={onSubmitHandler} autoComplete='off'>
      <Grid container alignItems='center'>
        {editDisable ? (
          <Typography {...title.pops}>{textValue}</Typography>
        ) : (
          <TextField
            required={required}
            autoFocus
            onChange={onChangeHandler}
            value={textValue}
            onFocus={stopPropagation}
            onClick={stopPropagation}
          />
        )}
        <IconButton onClick={stopPropagation} type='submit'>
          {editDisable ? <EditIcon /> : <SaveIcon />}
        </IconButton>
      </Grid>
    </form>
  );
};

export default EditableTitle;
