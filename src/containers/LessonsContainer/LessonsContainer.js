import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { fetchGroups } from '../../store/actions/groupsAction';
import { fetchSubjects } from '../../store/actions/subjectsAction';
import { getTeachersBySubject } from '../../store/actions/teachersActions';

const useStyles = makeStyles(() => ({
  lessonsData: {
    margin: 50,
    paddingLeft: 100,
    paddingRight: 400,
    display: 'flex',
    justifyContent: 'space-between',
  },
  autocomplete: {
    marginBottom: 20,
  },
  dates: {
    padding: 15,
  },
  dateBox: {
    marginBottom: 50,
  },
  dateText: {
    marginBottom: 5,
  },
}));

const LessonsContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchSubjects());
  }, [dispatch]);

  const { groups } = useSelector((state) => state.groups);
  const { subjects } = useSelector((state) => state.subjects);
  const { teachersBySubject } = useSelector((state) => state.teachers);

  const [group, setGroup] = useState(null);
  const [subject, setSubject] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      dispatch(getTeachersBySubject(subject.id));
    }
  }, [subject]);

  return (
    <Grid item xs={12} className={classes.lessonsData}>
      <Grid>
        <Autocomplete
          id='groups-lessons'
          className={classes.autocomplete}
          name='groupId'
          value={group}
          onChange={(event, value) => setGroup(value)}
          options={groups}
          getOptionLabel={(option) => option.groupName}
          noOptionsText={'список пуст'}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Группа' variant='outlined' placeholder='Выберите' />}
        />
        <Autocomplete
          id='subjects-lessons'
          className={classes.autocomplete}
          value={subject}
          onChange={(event, value) => setSubject(value)}
          options={subjects}
          getOptionLabel={(option) => option.subjectName || ''}
          noOptionsText={'список пуст'}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Предмет' variant='outlined' placeholder='Выберите' />}
        />
        <Autocomplete
          id='teachers-lessons'
          options={teachersBySubject}
          getOptionLabel={(option) => option.firstName || ''}
          value={teacher}
          onChange={(event, value) => setTeacher(value)}
          noOptionsText={'выберите сначала предмета'}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Учитель' variant='outlined' placeholder='Выберите' />}
        />
      </Grid>
      <Grid className={classes.dates}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Box className={classes.dateBox}>
            <Typography className={classes.dateText}>Дата начала</Typography>
            <KeyboardDatePicker value={startDate} onChange={(date) => setStartDate(date)} format='yyyy/MM/dd' />
          </Box>
          <Box>
            <Typography className={classes.dateText}>Дата конца</Typography>
            <KeyboardDatePicker value={endDate} onChange={(date) => setEndDate(date)} format='yyyy/MM/dd' />
          </Box>
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
};

export default LessonsContainer;
