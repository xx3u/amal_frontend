import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, TextField, Typography, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { fetchTeachers, getTeachersLessons } from '../../store/actions/teachersActions';
import { getWeekdates } from '../../helpers/helpers';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 20,
  },
  title: {
    margin: 20,
  },
}));

const LessonsByTeacher = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const teachersLessons = useSelector((state) => state.teachers.teachersLessons);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const { teachers } = useSelector((state) => state.teachers);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [lesson, setLesson] = useState({
    subjectId: '',
    teacherId: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    lesson.teacherId && dispatch(getTeachersLessons(lesson.teacherId, lesson.startTime, lesson.endTime));
  }, [lesson.teacherId, lesson.startTime]);

  useEffect(() => {
    const copyDate = new Date(selectedDate);
    const newCopyDate = new Date(selectedDate);
    setLesson({
      ...lesson,
      startTime: getWeekdates(copyDate).firstday,
      endTime: getWeekdates(newCopyDate).lastday,
    });
  }, [selectedDate]);

  const onClickHandler = () => {
    console.log('');
  };

  return (
    <>
      <Typography variant='h5' paragraph={true} className={classes.title}>
        Расписание по Учителям
      </Typography>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={3}>
          <Autocomplete
            id='teachers-lessons'
            className={classes.autoComplTeacher}
            options={teachers}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}` || ''}
            onChange={(event, value) => setLesson((state) => ({ ...state, teacherId: value?.id }))}
            noOptionsText={'выберите сначала предмета'}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label='Учитель' variant='outlined' placeholder='Выберите' />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box className={classes.dateBox}>
              <Typography className={classes.dateText}>Дата</Typography>
              <KeyboardDatePicker value={selectedDate} onChange={(date) => setSelectedDate(date)} format='yyyy/MM/dd' />
            </Box>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <ScheduleTable selectedParams={lesson} lessons={teachersLessons} onClickHandler={onClickHandler} />
    </>
  );
};

export default LessonsByTeacher;
