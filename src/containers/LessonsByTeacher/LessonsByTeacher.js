import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Typography, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { fetchTeachers, getTeachersLessons, setInitTeacherLesson } from '../../store/actions/teachersActions';
import { deleteLesson } from '../../store/actions/lessonsAction';
import { getWeekdates } from '../../helpers/helpers';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 20,
  },
  title: {
    marginTop: theme.spacing(4),
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
  const [teacher, setTeacher] = useState(null);

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

  useEffect(() => {
    return () => {
      dispatch(setInitTeacherLesson());
    };
  }, [dispatch]);

  const autocompleteChangeHandler = (value) => {
    setTeacher(value);
    setLesson((state) => ({ ...state, teacherId: value?.id }));
  };

  return (
    <>
      {user?.role === 'admin' ? (
        <Typography variant='h5' paragraph={true} className={classes.title}>
          ???????????????????? ???? ????????????????
        </Typography>
      ) : (
        <Typography variant='h5' paragraph={true} className={classes.title}>
          {user?.teacher && `${user.teacher.firstName} ${user.teacher.lastName}`}, ???????? ????????????????????:
        </Typography>
      )}
      <Grid container spacing={3} className={classes.container}>
        {user?.role === 'admin' ? (
          <Grid item xs={3}>
            <Autocomplete
              id='teachers-lessons'
              className={classes.autoComplTeacher}
              options={teachers}
              getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={(option) => `${option.firstName} ${option.lastName}` || ''}
              onChange={(event, value) => autocompleteChangeHandler(value)}
              value={teacher}
              noOptionsText={'???????????????? ?????????????? ????????????????'}
              renderInput={(params) => (
                <TextField {...params} label='??????????????' variant='outlined' placeholder='????????????????' />
              )}
            />
          </Grid>
        ) : null}
        <Grid item xs={3}>
          <KeyboardDatePicker
            label='????????'
            variant='inline'
            inputVariant='outlined'
            fullWidth
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            format='dd MMM yyyy'
          />
        </Grid>
      </Grid>
      <ScheduleTable
        deleteLessonHandler={user.role === 'admin' && deleteLessonHandler}
        lessonsParams={lesson}
        lessons={teachersLessons}
      />
    </>
  );
};

export default LessonsByTeacher;
