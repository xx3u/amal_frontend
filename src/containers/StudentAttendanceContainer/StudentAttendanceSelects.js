import DateFnsUtils from '@date-io/date-fns';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { endOfMonth, startOfMonth } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { transformToUTC } from '../../helpers/helpers';
import { fetchGroups } from '../../store/actions/groupsAction';
import { fetchLessonsByGroupId, setInitLessons } from '../../store/actions/lessonsAction';
import { getTeachersfromLessons } from '../../store/selectors/attendanceSelectors';

const StudentAttendanceSelects = ({ onSelectedTeacherHandler, onSelectedGroupHandler }) => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const teachers = useSelector(getTeachersfromLessons, shallowEqual);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
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

  useEffect(() => {
    setSelectedTeacher(null);
  }, [selectedGroup]);

  useEffect(() => {
    onSelectedTeacherHandler(selectedTeacher);
  }, [selectedTeacher]);
  return (
    <>
      <Grid item xs={3}>
        <Autocomplete
          id='groups-lessons'
          value={selectedGroup}
          getOptionSelected={(options, value) => options.id === value.id}
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

      <Grid item xs={3}>
        <Autocomplete
          id='teacher-select'
          value={selectedTeacher}
          getOptionSelected={(options, value) => options.id === value.id}
          onChange={(event, value) => {
            setSelectedTeacher(value);
          }}
          options={teachers}
          getOptionLabel={(option) => option?.fullName}
          noOptionsText={'список пуст'}
          renderInput={(params) => (
            <TextField {...params} label='Выберите учителя' variant='outlined' placeholder='Выберите' />
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
