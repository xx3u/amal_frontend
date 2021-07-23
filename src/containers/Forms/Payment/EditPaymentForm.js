import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Grid, Button } from '@material-ui/core';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import { useSelector, useDispatch } from 'react-redux';
import { addNewPayment, fetchPayments } from '../../../store/actions/paymentAction';

const EditPaymentForm = (props) => {
  const { payments } = useSelector((state) => state.payments);
  const dispatch = useDispatch();
  const paymentId = props.match.url.split('/')[3];

  const today = new Date().toISOString().slice(0, 10);

  const [payment, setPayment] = useState({
    studentId: '',
    date: today,
    amount: '',
  });

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value })
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(addNewPayment(payment));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogContent>
        <FormSubmission title={'Редактировать оплату'} onSubmit={submitFormHandler}>
          <Grid item xs={12}>
            <FormItem
              name='studentId'
              label='Студент'
              type='text'
              value={student || payment.studentId}
              onChange={inputChangeHandler}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormItem
              name='date'
              label='Дата оплаты'
              type='date'
              value={payment.date}
              onChange={inputChangeHandler}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormItem
              name='amount'
              label='Сумма оплаты'
              type='text'
              value={payment.amount}
              onChange={inputChangeHandler}
              required
            />
          </Grid>
        </FormSubmission>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentForm;
