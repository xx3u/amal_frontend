import React, { useState, useEffect } from 'react';
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
import { addNewLesson, fetchLessonsByGroupId } from '../../store/actions/lessonsAction';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';
import { getDateISOString } from '../../helpers/getDateISOString';

const useStyles = makeStyles(() => ({
  lessonsData: {
    margin: 50,
    paddingLeft: 100,
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

  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  });

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
    lesson.startTime && dispatch(fetchLessonsByGroupId(lesson.groupId, dates.startDate, dates.endDate));
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
    dispatch(fetchLessonsByGroupId(lesson.groupId, dates.startDate, dates.endDate));
  };

  useEffect(() => {
    lesson.subjectId && dispatch(getTeachersBySubject(lesson.subjectId));
  }, [lesson.subjectId]);

  useEffect(() => {
    setDates((prev) => {
      const lessonStartTime = new Date(lesson.startTime);
      const lessonEndTime = new Date(lesson.endTime);
      const startTime = lesson.startTime ? getDateISOString(lessonStartTime, 0, 0) : '';
      const endTime = lesson.endTime ? getDateISOString(lessonEndTime, 23, 59) : '';
      return { ...prev, startDate: startTime, endDate: endTime };
    });
  }, [lesson.startTime]);

  useEffect(() => {
    const copyDate = new Date(selectedDate);
    const newCopyDate = new Date(selectedDate);
    setLesson({
      ...lesson,
      startTime: getWeekdates(copyDate).firstday,
      endTime: getWeekdates(newCopyDate).lastday,
    });
  }, [selectedDate]);

  return (
    <>
      <Grid item xs={12} className={classes.lessonsData}>
        <Grid>
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
            onChange={(event, value) => setLesson((state) => ({ ...state, teacherId: value?.id }))}
            noOptionsText={'выберите сначала предмета'}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label='Учитель' variant='outlined' placeholder='Выберите' />
            )}
          />
        </Grid>
      </Grid>
      <ScheduleTable selectedParams={lesson} onClickHandler={onClickHandler} />
    </>
  );
};

export default LessonsContainer;
