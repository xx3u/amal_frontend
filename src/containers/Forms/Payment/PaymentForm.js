import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, TextField, Grid } from '@material-ui/core';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../../../store/actions/studentsAction';

const PaymentForm = () => {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { students } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const [student, setStudent] = useState({ id: '' });
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const inputChangeHandler = (value) => {
    value ? setStudent({ ...student, id: value.id }) : '';
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      maxWidth={'sm'}
      fullWidth={true}
    >
      <DialogContent>
        <FormSubmission title='Добавить оплату'>
          <Grid item xs={12}>
            <Autocomplete
              id='combo-box-demo'
              options={students}
              getOptionLabel={(option) => `${option.lastName} ${option.firstName}`}
              onChange={(value) => inputChangeHandler(value)}
              renderInput={(params) => (
                <TextField {...params} variant='outlined' label='Выберите студента' placeholder='Студент' />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormItem id='paymentDate' label='Дата оплаты' type='date' defaultValue={today} />
          </Grid>
          <Grid item xs={12}>
            <FormItem id='paymentAmount' label='Сумма оплаты' type='integer' />
          </Grid>
        </FormSubmission>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentForm;
