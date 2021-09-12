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
  status: {
    marginRight: 10,
  },
}));

const StatusIconText = ({ status }) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent='space-between'>
      <Grid item xs={6}>
        <Typography className={classes.status}>{status ? 'Оплачено' : 'Не оплачено'}</Typography>
      </Grid>
      <Grid item xs={4}>
        {status ? (
          <CheckCircleOutlineIcon className={classes.iconStatus} style={{ color: green[500] }} />
        ) : (
          <ErrorOutlineIcon color='secondary' className={classes.iconStatus} />
        )}
      </Grid>
    </Grid>
  );
};

export default StatusIconText;
