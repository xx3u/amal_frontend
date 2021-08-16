import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Grid, TextField, Box, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { fetchGroups } from '../../store/actions/groupsAction';
import { fetchSubjects } from '../../store/actions/subjectsAction';
import { getTeachersBySubject } from '../../store/actions/teachersActions';
import { ru } from 'date-fns/locale';

const LessonsSelectors = () => {
  const dispatch = useDispatch();

  const { groups, subjects, teachersBySubject } = useSelector(
    (state) => ({
      groups: state.groups.groups,
      subjects: state.subjects.subjects,
      teachersBySubject: state.teachers.teachersBySubject,
    }),
    shallowEqual
  );

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchSubjects());
  }, [dispatch]);

  useEffect(() => {
    setSelectedTeacher(null);
    selectedSubject && dispatch(getTeachersBySubject(selectedSubject.id));
  }, [selectedSubject]);

  useEffect(() => {
    // const copyDate = new Date(selectedDate);
    // const newCopyDate = new Date(selectedDate);
    // setLessonsFilter({
    //   ...lessonsFilter,
    //   startTime: getWeekdates(copyDate).firstday,
    //   endTime: getWeekdates(newCopyDate).lastday,
    // });
  }, [selectedDate]);

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
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Группа' variant='outlined' placeholder='Выберите' />}
        />
      </Grid>
      <Grid item xs={3}>
        <MuiPickersUtilsProvider locale={ru} utils={DateFnsUtils}>
          <Box>
            <Typography>Дата</Typography>
            <KeyboardDatePicker value={selectedDate} onChange={(date) => setSelectedDate(date)} format='dd MMM yyyy' />
          </Box>
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={3}>
        <Autocomplete
          id='subjects-lessons'
          value={selectedSubject}
          onChange={(event, value) => {
            setSelectedSubject(value);
          }}
          options={subjects}
          getOptionLabel={(option) => option.subjectName || ''}
          noOptionsText={'список пуст'}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Предмет' variant='outlined' placeholder='Выберите' />}
        />
      </Grid>
      <Grid item xs={3}>
        <Autocomplete
          id='teachers-lessons'
          value={selectedTeacher}
          options={teachersBySubject}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}` || ''}
          onChange={(event, value) => {
            setSelectedTeacher(value);
          }}
          noOptionsText={'выберите сначала предмета'}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Учитель' variant='outlined' placeholder='Выберите' />}
        />
      </Grid>
    </>
  );
};

export default LessonsSelectors;
