import DateFnsUtils from '@date-io/date-fns';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { endOfMonth, startOfMonth } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transformToUTC } from '../../helpers/helpers';
import { fetchGroups } from '../../store/actions/groupsAction';
import { fetchLessonsByGroupId, setInitLessons } from '../../store/actions/lessonsAction';

const StudentAttendanceContainer = () => {
  const dispatch = useDispatch();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDate, setSelectedDate] = useState(transformToUTC(new Date()));
  const [monthInterval, setMonthInterval] = useState({
    start: null,
    end: null,
  });

  const groups = useSelector((state) => state.groups.groups);
  const students = useSelector((state) => state.groups.groups.students);
  const lessons = useSelector((state) => state.lessons.lessons);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    setMonthInterval({
      start: transformToUTC(startOfMonth(selectedDate)),
      end: transformToUTC(endOfMonth(selectedDate)),
    });
  }, [selectedDate]);

  useEffect(() => {
    dispatch(setInitLessons());
    selectedDate &&
      selectedGroup?.id &&
      dispatch(
        fetchLessonsByGroupId(selectedGroup.id, monthInterval.start.toISOString(), monthInterval.end.toISOString())
      );
  }, [selectedGroup, monthInterval, dispatch]);

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
            onChange={(date) => setSelectedDate(transformToUTC(date))}
            format='dd MMM yyyy'
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export default StudentAttendanceContainer;
