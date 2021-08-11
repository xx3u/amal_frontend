import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, TextField, Typography, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { fetchGroups } from '../../store/actions/groupsAction';
import { fetchSubjects } from '../../store/actions/subjectsAction';
import { getTeachersBySubject } from '../../store/actions/teachersActions';
import { getWeekdates } from '../../helpers/helpers';
import { addNewLesson, fetchLessonsByGroupId } from '../../store/actions/lessonsAction';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';
import CreateLessons from '../Forms/Lesson/CreateLessons';

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 20,
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

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [lesson, setLesson] = useState({
    groupId: '',
    subjectId: '',
    teacherId: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    lesson.startTime && dispatch(fetchLessonsByGroupId(lesson.groupId, lesson.startTime, lesson.endTime));
  }, [lesson.groupId, dispatch]);

  const onClickHandler = async (startTime, endTime) => {
    const newLesson = {
      groupId: lesson.groupId,
      subjectId: lesson.subjectId,
      teacherId: lesson.teacherId,
      startTime: startTime,
      endTime: endTime,
    };
    await dispatch(addNewLesson(newLesson));
    dispatch(fetchLessonsByGroupId(lesson.groupId, lesson.startTime, lesson.endTime));
  };

  useEffect(() => {
    lesson.subjectId && dispatch(getTeachersBySubject(lesson.subjectId));
  }, [lesson.subjectId]);

  useEffect(() => {
    const copyDate = new Date(selectedDate);
    const newCopyDate = new Date(selectedDate);
    setLesson({
      ...lesson,
      startTime: getWeekdates(copyDate).firstday,
      endTime: getWeekdates(newCopyDate).lastday,
    });
  }, [selectedDate]);

  const [isOpen, setIsOpen] = useState({ status: false });

  const openPaymentForm = (e) => {
    e.stopPropagation();
    setIsOpen({ status: true });
  };

  return (
    <>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={3}>
          <Autocomplete
            id='groups-lessons'
            className={classes.autocomplete}
            onChange={(event, value) => setLesson((state) => ({ ...state, groupId: value?.id }))}
            options={groups}
            getOptionLabel={(option) => option.groupName}
            noOptionsText={'список пуст'}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label='Группа' variant='outlined' placeholder='Выберите' />}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            id='subjects-lessons'
            className={classes.autocomplete}
            onChange={(event, value) => setLesson((state) => ({ ...state, subjectId: value?.id }))}
            options={subjects}
            getOptionLabel={(option) => option.subjectName || ''}
            noOptionsText={'список пуст'}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label='Предмет' variant='outlined' placeholder='Выберите' />
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
        <Grid item xs={3}>
          <Autocomplete
            id='teachers-lessons'
            className={classes.autoComplTeacher}
            options={teachersBySubject}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}` || ''}
            onChange={(event, value) => setLesson((state) => ({ ...state, teacherId: value?.id }))}
            noOptionsText={'выберите сначала предмета'}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label='Учитель' variant='outlined' placeholder='Выберите' />
            )}
          />
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            onClick={(e) => openPaymentForm(e)}
            disabled={lesson.groupId  === '' || lesson.groupId === undefined}
          >
            Создать на период
          </Button>
        </Grid>
      </Grid>
      <ScheduleTable selectedParams={lesson} onClickHandler={onClickHandler} />
      <CreateLessons isOpen={isOpen} groupId={lesson.groupId} startTime={lesson.startTime} endTime={lesson.endTime} />
    </>
  );
};

export default LessonsContainer;
