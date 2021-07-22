import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, TextField, Grid } from '@material-ui/core';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../../../store/actions/studentsAction';

const PaymentForm = ({ isOpen, handleClose, studId, title }) => {
  const { students } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  let student;
  students.forEach((stud) => {
    stud.id === studId ? (student = `${stud.firstName} ${stud.lastName}`) : null;
  });

  const today = new Date().toISOString().slice(0, 10);

  const [payment, setPayment] = useState({
    studentId: '',
    date: today,
    amount: '',
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    studId
      ? setPayment({ ...payment, studentId: studId, [name]: value })
      : setPayment({
          ...payment,
          date: e.target.name === 'date' ? e.target.value : payment.date,
          amount: e.target.name === 'amount' ? e.target.value : payment.amount,
        });
  };

  const autocompleteChangeHandler = (value) => {
    value ? setPayment({ ...payment, studentId: value.id }) : '';
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log('payment', payment);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogContent>
        <FormSubmission title={title} onSubmit={submitFormHandler}>
          <Grid item xs={12}>
            {studId ? (
              <FormItem
                name='studentId'
                label='Студент'
                type='text'
                value={student || payment.studentId}
                onChange={inputChangeHandler}
                required
              />
            ) : (
              <Autocomplete
                id='combo-box-demo'
                options={students}
                getOptionLabel={(option) => `${option.lastName} ${option.firstName}`}
                onChange={(e, value) => autocompleteChangeHandler(value)}
                renderInput={(params) => (
                  <TextField {...params} variant='outlined' label='Выберите студента' placeholder='Студент' required />
                )}
              />
            )}
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

export default PaymentForm;