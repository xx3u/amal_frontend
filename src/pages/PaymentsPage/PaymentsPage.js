import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PaymentsContainer from '../../containers/PaymentsContainer/PaymentsContainer';

const useStyles = makeStyles(() => ({
  title: {
    margin: 20,
    fontWeight: 'bold',
  },
}));

const PaymentsPage = () => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant='h5' className={classes.title}>
        Платежи
      </Typography>
      <PaymentsContainer />
    </Grid>
  );
};

export default PaymentsPage;
