import React, { useState, useEffect } from 'react';
import { Grid, Dialog, DialogContent, Button, DialogTitle, DialogActions } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { ru } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';

const CreateLessons = ({ isOpen, groupId, startTime, endTime }) => {
  registerLocale('ru', ru);

  const [createDateRange, setCreateDateRange] = useState({
    startTime,
    endTime,
    createStartDate: new Date(),
    createEndDate: new Date(),
  });

  const [open, setOpen] = useState(isOpen.status);

  useEffect(() => {
    setOpen(isOpen.status);
    setCreateDateRange({ ...createDateRange, startTime, endTime });
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogTitle id='alert-dialog-title'>{'Выберите период для создания групповых занятий'}</DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
          <Grid container justifyContent='space-around' spacing={2}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Дата начала периода'
              value={createDateRange.createStartDate}
              onChange={(date) => setCreateDateRange({ ...createDateRange, createStartDate: date })}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Дата окончания периода'
              value={createDateRange.createEndDate}
              onChange={(date) => setCreateDateRange({ ...createDateRange, createEndDate: date })}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={submitHandler} color='primary' autoFocus>
          Создать занятия
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLessons;
