import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ru } from 'date-fns/locale';
import { fetchGroups } from '../../store/actions/groupsAction';
import { fetchSubjects } from '../../store/actions/subjectsAction';
import { getTeachersBySubject, setTeachersBySubject } from '../../store/actions/teachersActions';
import { fetchLessonsByGroupId, setLessonsParams } from '../../store/actions/lessonsAction';
import { getWeekdates } from '../../helpers/helpers';

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
    dispatch(setTeachersBySubject([]));
    selectedSubject && dispatch(getTeachersBySubject(selectedSubject.id));
  }, [selectedSubject]);

  useEffect(() => {
    selectedDate &&
      selectedGroup?.id &&
      dispatch(
        fetchLessonsByGroupId(
          selectedGroup?.id,
          getWeekdates(selectedDate).firstday.toISOString(),
          getWeekdates(selectedDate).lastday.toISOString()
        )
      );
  }, [selectedGroup, selectedDate, dispatch]);

  useEffect(() => {
    dispatch(
      setLessonsParams({
        groupId: selectedGroup?.id || '',
        subjectId: selectedSubject?.id || '',
        teacherId: selectedTeacher?.id || '',
        startTime: getWeekdates(selectedDate).firstday,
        endTime: getWeekdates(selectedDate).lastday,
      })
    );
  }, [selectedDate, selectedSubject, selectedTeacher, selectedGroup]);

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
          renderInput={(params) => <TextField {...params} label='Учитель' variant='outlined' placeholder='Выберите' />}
        />
      </Grid>
    </Grid>
  );
};

export default LessonsSelectors;