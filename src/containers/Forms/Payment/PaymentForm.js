import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions, Grid } from '@material-ui/core';
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

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return(
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogContent>
        <FormSubmission title='Добавить оплату' maxWidth='md'>
          <Grid item xs={12}>
            <Autocomplete
              // value={students}
              // onChange={(event, selectedStudents) => {
              //   setSelectedStudents(selectedStudents);
              // }}
              id='combo-box-demo'
              options={students}
              getOptionLabel={(option) => `${option.lastName} ${option.firstName}`}
              renderInput={(params) => (
                <TextField {...params} variant='outlined' label='Добавить студента' placeholder='Выберите' />
              )}
            />
        </Grid>
        </FormSubmission>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  )
};

export default PaymentForm;