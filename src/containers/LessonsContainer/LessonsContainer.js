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
import { getWeekdates } from '../../helpers/helpers';

const useStyles = makeStyles(() => ({
  lessonsData: {
    margin: 50,
    paddingLeft: 100,
    paddingRight: 400,
    display: 'flex',
    justifyContent: 'space-between',
  },
  autocomplete: {
    marginBottom: 25,
  },
  dateBox: {
    textAlign: 'center',
  },
  dateText: {
    marginBottom: 5,
    textAlign: 'start',
    marginLeft: 20,
  },
  autoComplTeacher: {
    marginTop: 20,
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
  const [selectedDate, setSelectedDate] = useState(new Date());

  const copySelectedDate = new Date(selectedDate);
  getWeekdates(copySelectedDate);

  useEffect(() => {
    subject && dispatch(getTeachersBySubject(subject.id));
  }, [subject]);

  return (
    <Grid item xs={12} className={classes.lessonsData}>
      <Grid>
        <Autocomplete
          id='groups-lessons'
          className={classes.autocomplete}
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
      </Grid>
      <Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Box className={classes.dateBox}>
            <Typography className={classes.dateText}>Дата</Typography>
            <KeyboardDatePicker value={selectedDate} onChange={(date) => setSelectedDate(date)} format='yyyy/MM/dd' />
          </Box>
        </MuiPickersUtilsProvider>
        <Autocomplete
          id='teachers-lessons'
          className={classes.autoComplTeacher}
          options={teachersBySubject}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}` || ''}
          value={teacher}
          onChange={(event, value) => setTeacher(value)}
          noOptionsText={'выберите сначала предмета'}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Учитель' variant='outlined' placeholder='Выберите' />}
        />
      </Grid>
    </Grid>
  );
};

export default LessonsContainer;
