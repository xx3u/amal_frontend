import React from 'react';
import { TextField } from '@material-ui/core';

const FormItem = (props) => {
  return (
    <TextField
      variant='outlined'
      fullWidth
      required={props.required}
      id={props.name}
      type={props.type}
      multiline={props.multiline}
      rows={3}
      label={props.label}
      name={props.name} 
      autoComplete={props.name}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
      error={!!props.error}
      helperText={props.error}
    />
  )
};

export default FormItem;