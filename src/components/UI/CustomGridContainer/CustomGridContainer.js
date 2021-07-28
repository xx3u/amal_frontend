import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  iconStatus: {
    verticalAlign: 'middle',
    marginLeft: 10,
  },
}));

const CustomGridContainer = ({ status }) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent='space-between'>
      <Grid item xs={6}>
        <Typography>{status ? 'Оплачено' : 'Не оплачено'}</Typography>
      </Grid>
      <Grid item xs={6}>
        {status ? (
          <CheckCircleOutlineIcon className={classes.iconStatus} style={{ color: green[500] }} />
        ) : (
          <ErrorOutlineIcon color='secondary' className={classes.iconStatus} />
        )}
      </Grid>
    </Grid>
  );
};

export default CustomGridContainer;
