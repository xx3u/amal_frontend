import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, TextField, Typography, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { ru } from 'date-fns/locale';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { fetchTeachers, getTeachersLessons } from '../../store/actions/teachersActions';
import { deleteLesson } from '../../store/actions/lessonsAction';
import { getWeekdates } from '../../helpers/helpers';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 20,
  },
  title: {
    marginTop: 20,
  },
}));

const LessonsByTeacher = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const teachersLessons = useSelector((state) => state.teachers.teachersLessons);
  const user = useSelector((state) => state.users.user);
  const teacherId = user?.teacher && user.teacher.id;

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const { teachers } = useSelector((state) => state.teachers);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [lesson, setLesson] = useState({
    teacherId: user?.role === 'teacher' ? teacherId : '',
    startTime: getWeekdates(new Date()).firstday,
    endTime: getWeekdates(new Date()).lastday,
  });

  const deleteLessonHandler = async (lessonId) => {
    await dispatch(deleteLesson(lessonId));
    dispatch(getTeachersLessons(lesson.teacherId, lesson.startTime, lesson.endTime));
  };

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
      {user?.role === 'admin' ? (
        <Typography variant='h5' paragraph={true} className={classes.title}>
          Расписание по Учителям
        </Typography>
      ) : (
        <Typography variant='h5' paragraph={true} className={classes.title}>
          {user?.teacher && `${user.teacher.firstName} ${user.teacher.lastName}`}, ваше расписание:
        </Typography>
      )}
      <Grid container spacing={3} className={classes.container}>
        {user?.role === 'admin' ? (
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
        ) : null}
        <Grid item xs={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
            <Box className={classes.dateBox}>
              <Typography className={classes.dateText}>Дата</Typography>
              <KeyboardDatePicker value={selectedDate} onChange={(date) => setSelectedDate(date)} format='yyyy/MM/dd' />
            </Box>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <ScheduleTable
        selectedParams={lesson}
        lessons={teachersLessons}
        onClickHandler={onClickHandler}
        deleteLessonHandler={deleteLessonHandler}
        isVisibleButtons={false}
      />
    </>
  );
};

export default LessonsByTeacher;
