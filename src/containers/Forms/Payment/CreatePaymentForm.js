import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, TextField, Grid } from '@material-ui/core';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../../../store/actions/studentsAction';
import { addNewPayment } from '../../../store/actions/paymentAction';
import { format } from 'date-fns';

const CreatePaymentForm = ({ isOpen, title }) => {
  const { students } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const today = format(new Date(), 'yyyy-MM-dd');

  const [payment, setPayment] = useState({
    studentId: '',
    date: today,
    amount: '',
    comment: '',
  });

  const [open, setOpen] = useState(isOpen.status);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    setOpen(isOpen.status);
  }, [isOpen]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setPayment((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const autocompleteChangeHandler = (value) => {
    value && setPayment({ ...payment, studentId: value.id });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(addNewPayment(payment));
    setOpen(false);
    setPayment({
      studentId: '',
      date: today,
      amount: '',
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogContent>
        <FormSubmission title={title} onSubmit={submitFormHandler}>
          <Grid item xs={12}>
            <Autocomplete
              id='combo-box-demo'
              options={students}
              getOptionLabel={(option) => `${option.lastName} ${option.firstName}`}
              onChange={(e, value) => autocompleteChangeHandler(value)}
              renderInput={(params) => (
                <TextField {...params} variant='outlined' label='Выберите студента' placeholder='Студент' required />
              )}
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
          <Grid item xs={12}>
            <FormItem
              name='comment'
              label='Комментарий'
              type='text'
              value={payment.comment}
              onChange={inputChangeHandler}
              required
            />
          </Grid>
        </FormSubmission>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePaymentForm;
