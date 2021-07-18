import React from 'react';
import { Button } from '@material-ui/core';

const CustomButton = ({ variant, color, size, component, to, title }) => (
  <Button variant={variant} color={color} size={size} component={component} to={to}>
    {title}
  </Button>
);

export default CustomButton;
