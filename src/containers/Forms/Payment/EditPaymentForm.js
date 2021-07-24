import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Grid } from '@material-ui/core';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPayments, updatePayment } from '../../../store/actions/paymentAction';
import { getPaymentById } from './../../../store/actions/paymentAction';
import { push } from 'connected-react-router';

const EditPaymentForm = (props) => {
  const selectedPayment = useSelector((state) => state.payments.payment);
  const dispatch = useDispatch();
  const paymentId = props.match.url.split('/')[3];

  function formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  let convertedDate = formatDate(selectedPayment.date);

  useEffect(() => {
    dispatch(getPaymentById(paymentId));
  }, [paymentId]);

  useEffect(() => {
    setPayment({
      ...payment,
      studentId: selectedPayment.Student
        ? `${selectedPayment.Student.firstName} ${selectedPayment.Student.lastName}`
        : '',
      date: convertedDate,
      amount: selectedPayment.amount,
    });
  }, [selectedPayment]);

  const [payment, setPayment] = useState({
    studentId: '',
    date: '',
    amount: '',
  });

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(push('/admin-app/payments'));
  };

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    setOpen(false);
    dispatch(updatePayment(paymentId, { ...payment, studentId: selectedPayment.studentId }));
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
              value={payment.studentId || ''}
              onChange={inputChangeHandler}
              disabled
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormItem
              name='date'
              label='Дата оплаты'
              type='date'
              value={payment.date || ''}
              onChange={inputChangeHandler}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormItem
              name='amount'
              label='Сумма оплаты'
              type='text'
              value={payment.amount || ''}
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
