import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Grid } from '@material-ui/core';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPayments, updatePayment } from '../../../store/actions/paymentAction';
import { getPaymentById } from './../../../store/actions/paymentAction';
import { format } from 'date-fns';

const EditPaymentForm = ({ isOpen, paymentId }) => {
  const selectedPayment = useSelector((state) => state.payments.payment);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(isOpen.status);

  useEffect(() => {
    setOpen(isOpen.status);
  }, [isOpen]);

  let convertedDate = selectedPayment.date && format(new Date(selectedPayment.date), 'yyyy-MM-dd');
  let studentName;
  if (selectedPayment.Student) {
    studentName = `${selectedPayment.Student.firstName} ${selectedPayment.Student.lastName}`;
  }

  useEffect(() => {
    paymentId && dispatch(getPaymentById(paymentId));
  }, [paymentId]);

  useEffect(() => {
    setPayment({
      ...payment,
      studentId: selectedPayment.studentId,
      date: convertedDate,
      amount: selectedPayment.amount,
      comment: selectedPayment.comment,
    });
  }, [selectedPayment]);

  const [payment, setPayment] = useState({
    studentId: '',
    date: '',
    amount: '',
    comment: '',
  });

  const handleClose = () => {
    setOpen(false);
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
    dispatch(updatePayment(paymentId, payment));
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogContent>
        <FormSubmission title={'Редактировать оплату'} onSubmit={submitFormHandler}>
          <Grid item xs={12}>
            <FormItem name='studentId' label={studentName} type='text' disabled />
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
          <Grid item xs={12}>
            <FormItem
              name='comment'
              label='Комментарий'
              type='text'
              value={payment.comment || ''}
              onChange={inputChangeHandler}
            />
          </Grid>
        </FormSubmission>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentForm;
