import React, { useState } from 'react';
import { Grid, IconButton, TextField, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

const EditableTitle = ({
  value,
  onSave = () => {},
  title = {
    props: {
      variant: 'h6',
      component: 'p',
    },
  },
}) => {
  const [editDisable, setEditEnable] = useState(true);
  const [textValue, setTextValue] = useState(value);

  const onClickHandler = (e) => {
    e.stopPropagation();
    setEditEnable(!editDisable);
    if (!editDisable && value !== textValue) {
      onSave(textValue);
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
    <Grid container alignItems='center'>
      {editDisable ? (
        <Typography {...title.pops}>{textValue}</Typography>
      ) : (
        <TextField onChange={onChangeHandler} value={textValue} onFocus={stopPropagation} onClick={stopPropagation} />
      )}
      <IconButton onClick={onClickHandler}>{editDisable ? <EditIcon /> : <SaveIcon />}</IconButton>
    </Grid>
  );
};

export default EditableTitle;
