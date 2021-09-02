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
import { fetchLessonsByGroupId, setInitLessons, setLessonsParams } from '../../store/actions/lessonsAction';
import { getTeachersfromLessons } from '../../store/selectors/attendanceSelectors';

const StudentAttendanceSelects = () => {
  const dispatch = useDispatch();

  const groups = useSelector((state) => state.groups.groups);
  const teachers = useSelector(getTeachersfromLessons, shallowEqual);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedDate, setSelectedDate] = useState(transformToUTC(new Date()));
  const [monthInterval, setMonthInterval] = useState({
    start: null,
    end: null,
  });

  const user = useSelector((state) => state.users.user);
  const isTeacherRole = user?.role === 'teacher' ? true : false;

  const teacherData = {
    id: user.teacher?.id,
    fullName: `${user.teacher?.lastName} ${user.teacher?.firstName}`,
  };

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setLessonsParams({
        groupId: selectedGroup?.id,
        startTime: monthInterval.start,
        endTime: monthInterval.end,
        teacherId: selectedTeacher?.id,
        selectedGroup: selectedGroup,
      })
    );
    return () => {
      setLessonsParams({
        groupId: '',
        startTime: '',
        endTime: '',
        teacherId: '',
        selectedGroup: {},
      });
    };
  }, [selectedGroup, monthInterval, selectedTeacher, dispatch]);

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
    setSelectedTeacher(isTeacherRole ? teacherData : null);
  }, [selectedGroup]);

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

      <>
        {!isTeacherRole ? (
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
        ) : null}
      </>

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
            format=' MMM yyyy'
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default StudentAttendanceSelects;
