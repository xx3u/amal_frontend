import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PaymentsContainer from '../../containers/PaymentsContainer/PaymentsContainer';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(4),
  },
}));

const PaymentsPage = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.content}>
      <PaymentsContainer />
    </Grid>
  );
};

export default PaymentsPage;
