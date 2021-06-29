import React from 'react';
import { Grid, TextField } from '@material-ui/core';

const FormItem = (props) => {
  return (
    <Grid item xs={12}>
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
    </Grid>
  )
};

export default FormItem;