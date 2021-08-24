import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { ru } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import { fetchGroups } from '../../store/actions/groupsAction';

const StudentAttendanceContainer = () => {
  const dispatch = useDispatch();
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const groups = useSelector((state) => state.groups.groups);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <Grid container item spacing={3}>
      <Grid item xs={3}>
        <Autocomplete
          id='groups-lessons'
          value={selectedGroup}
          onChange={(event, value) => {
            setSelectedGroup(value);
          }}
          options={groups}
          getOptionLabel={(option) => option.groupName}
          noOptionsText={'список пуст'}
          renderInput={(params) => <TextField {...params} label='Группа' variant='outlined' placeholder='Выберите' />}
        />
      </Grid>
      <MuiPickersUtilsProvider locale={ru} utils={DateFnsUtils}>
        <Grid item xs={3}>
          <KeyboardDatePicker
            label='Дата'
            variant='inline'
            inputVariant='outlined'
            fullWidth
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            format='dd MMM yyyy'
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export default StudentAttendanceContainer;
