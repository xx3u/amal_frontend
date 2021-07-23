import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PaymentsContainer from '../../containers/PaymentsContainer/PaymentsContainer';
import PaymentForm from './../../containers/Forms/Payment/PaymentForm';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(4),
  },
  addBtn: {
    marginBottom: 40,
  },
}));

const PaymentsPage = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const closePaymentForm = () => {
    setIsOpen(false);
  };

  return (
    <Grid container className={classes.content}>
      <PaymentForm isOpen={isOpen} handleClose={closePaymentForm} title='Добавить оплату' />
      <Button variant='contained' color='default' className={classes.addBtn} onClick={() => setIsOpen(true)}>
        Добавить оплату
      </Button>
      <PaymentsContainer />
    </Grid>
  );
};

export default PaymentsPage;
