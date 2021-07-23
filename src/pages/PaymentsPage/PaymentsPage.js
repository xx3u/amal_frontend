import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PaymentsContainer from '../../containers/PaymentsContainer/PaymentsContainer';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(4),
  },
  addBtn: {
    marginBottom: 40
  }
}));

const PaymentsPage = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.content}>
      <Button variant='contained'  color='default' className={classes.addBtn}>Добавить оплату</Button>
      <PaymentsContainer />
    </Grid>
  );
};

export default PaymentsPage;
