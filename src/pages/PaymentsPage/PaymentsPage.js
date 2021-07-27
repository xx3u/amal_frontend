import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PaymentsContainer from '../../containers/PaymentsContainer/PaymentsContainer';
import CreatePaymentForm from '../../containers/Forms/Payment/CreatePaymentForm';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(4),
  },
  addBtn: {
    marginBottom: 20,
  },
}));

const PaymentsPage = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState({ status: false });

  const openPaymentForm = () => {
    setIsOpen({ status: true });
  };

  return (
    <Grid container className={classes.content}>
      <CreatePaymentForm isOpen={isOpen} title='Добавить оплату' />
      <Button variant='contained' color='default' className={classes.addBtn} onClick={openPaymentForm}>
        Добавить оплату
      </Button>
      <PaymentsContainer />
    </Grid>
  );
};

export default PaymentsPage;
