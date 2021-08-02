import { Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchGroups } from '../../store/actions/groupsAction';
import { fetchSubjects } from '../../store/actions/subjectsAction';
import { getTeachersBySubject } from '../../store/actions/teachersActions';

const LessonsContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchSubjects());
  }, [dispatch]);

  const { groups } = useSelector((state) => state.groups);
  const { subjects } = useSelector((state) => state.subjects);
  const { teachersBySubject } = useSelector((state) => state.teachers);
  const [subjectId, setSubjectId] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeSubject = (event, value) => {
    setSubjectId(value.id);
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      dispatch(getTeachersBySubject(subjectId));
    }
  }, [subjectId]);

  return (
    <Grid item xs={12}>
      <Autocomplete
        id='groups-lessons'
        options={groups}
        getOptionLabel={(option) => option.groupName}
        noOptionsText={'список пуст'}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label='Группа' variant='outlined' placeholder='Выберите' />}
      />
      <Autocomplete
        id='subjects-lessons'
        options={subjects}
        getOptionLabel={(option) => option.subjectName}
        onChange={onChangeSubject}
        noOptionsText={'список пуст'}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label='Предмет' variant='outlined' placeholder='Выберите' />}
      />
      <Autocomplete
        id='teachers-lessons'
        options={teachersBySubject}
        getOptionLabel={(option) => option.firstName}
        noOptionsText={'выберите сначала предмета'}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label='Учитель' variant='outlined' placeholder='Выберите' />}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker value={startDate} onChange={(date) => setStartDate(date)} format='yyyy/MM/dd' />
        <KeyboardDatePicker value={endDate} onChange={(date) => setEndDate(date)} format='yyyy/MM/dd' />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export default LessonsContainer;
