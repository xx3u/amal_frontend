import React from 'react';
import { TextField } from '@material-ui/core';

const FormItem = ({
  required,
  name,
  type,
  multiline,
  label,
  value,
  onChange,
  className,
  error,
  select,
  defaultValue,
  disabled,
  children,
}) => (
  <TextField
    variant='outlined'
    fullWidth
    required={required}
    id={name}
    type={type}
    multiline={multiline}
    rows={3}
    label={label}
    name={name}
    autoComplete={name}
    value={value}
    onChange={onChange}
    className={className}
    error={!!error}
    helperText={error}
    select={select}
    defaultValue={defaultValue}
    disabled={disabled}
  >
    {children}
  </TextField>
);

export default FormItem;
