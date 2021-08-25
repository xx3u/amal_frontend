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

const StudentAttendanceSelects = ({ onSelectedGroupHandler }) => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDate, setSelectedDate] = useState(transformToUTC(new Date()));
  const [monthInterval, setMonthInterval] = useState({
    start: null,
    end: null,
  });
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    onSelectedGroupHandler && onSelectedGroupHandler(selectedGroup);
  }, [selectedGroup, dispatch]);

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
    <>
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
          renderInput={(params) => (
            <TextField {...params} label='Выберите Группу' variant='outlined' placeholder='Выберите' />
          )}
        />
      </Grid>

      <MuiPickersUtilsProvider locale={ru} utils={DateFnsUtils}>
        <Grid item xs={3}>
          <KeyboardDatePicker
            openTo='month'
            views={['month']}
            label='Дата'
            variant='dialog'
            inputVariant='outlined'
            fullWidth
            value={selectedDate}
            onChange={(date) => setSelectedDate(transformToUTC(date))}
            format='dd MMMM yyyy'
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default StudentAttendanceSelects;
