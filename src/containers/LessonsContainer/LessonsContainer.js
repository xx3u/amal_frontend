import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addNewLesson, fetchLessonsByGroupId, deleteLesson } from '../../store/actions/lessonsAction';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';
import CreateLessons from '../Forms/Lesson/CreateLessons';
import LessonsSelectors from './LessonsSelectors';

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 20,
  },
}));

const LessonsContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { lessons, lessonsParams } = useSelector((state) => state.lessons);

  const [isOpen, setIsOpen] = useState({ status: false });

  const onClickHandler = async (startTime, endTime) => {
    const newLesson = {
      groupId: lessonsParams.groupId,
      subjectId: lessonsParams.subjectId,
      teacherId: lessonsParams.teacherId,
      startTime: startTime,
      endTime: endTime,
    };
    await dispatch(addNewLesson(newLesson));
    dispatch(
      fetchLessonsByGroupId(
        lessonsParams.groupId,
        lessonsParams.startTime.toISOString(),
        lessonsParams.endTime.toISOString()
      )
    );
  };
  const deleteLessonHandler = async (lessonId) => {
    await dispatch(deleteLesson(lessonId));
    dispatch(
      fetchLessonsByGroupId(
        lessonsParams.groupId,
        lessonsParams.startTime.toISOString(),
        lessonsParams.endTime.toISOString()
      )
    );
  };

  const onClickHandlerCreateLessons = () => {
    setIsOpen({ status: true });
  };

  return (
    <>
      <Grid container spacing={3} className={classes.container}>
        <LessonsSelectors />
        <Grid item>
          <Button variant='contained' onClick={onClickHandlerCreateLessons} disabled={!lessonsParams.groupId}>
            Создать на период
          </Button>
        </Grid>
      </Grid>
      <ScheduleTable
        selectedParams={lessonsParams}
        onClickHandler={onClickHandler}
        lessons={lessons}
        deleteLessonHandler={deleteLessonHandler}
      />
      <CreateLessons
        isOpen={isOpen}
        groupId={lessonsParams.groupId}
        startTime={lessonsParams.startTime}
        endTime={lessonsParams.endTime}
      />
    </>
  );
};

export default LessonsContainer;
