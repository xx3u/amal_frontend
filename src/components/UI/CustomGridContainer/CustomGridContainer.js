import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const CustomGridContainer = ({ text, icon }) => {
  return (
    <Grid container justifyContent='space-between'>
      <Grid item xs={6}>
        <Typography>{text}</Typography>
      </Grid>
      <Grid item xs={6}>
        {icon}
      </Grid>
    </Grid>
  );
};

export default CustomGridContainer;
