import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { clearUpdateTeacherError, fetchUpdateTeacherInLessons } from '../../store/actions/groupsAction';
import { addNewLesson, fetchLessonsByGroupId, deleteLesson } from '../../store/actions/lessonsAction';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';
import CreateLessons from '../Forms/Lesson/CreateLessons';
import InfoModal from '../../components/UI/InfoModal/InfoModal';
import LessonsSelectors from './LessonsSelectors';
import { getTeachersLessons } from '../../store/actions/teachersActions';

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 20,
  },
}));

const LessonsContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const updateTeacherError = useSelector((state) => state.groups.updateTeacherError);

  const { lessons, lessonsParams } = useSelector((state) => state.lessons);
  const teachersLessons = useSelector((state) => state.teachers.teachersLessons);
  const [isOpen, setIsOpen] = useState({ status: false });

  const addLessonHandler = async (startTime, endTime) => {
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
    lessonsParams.teacherId &&
      dispatch(
        getTeachersLessons(
          lessonsParams.teacherId,
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
    lessonsParams.teacherId &&
      dispatch(
        getTeachersLessons(
          lessonsParams.teacherId,
          lessonsParams.startTime.toISOString(),
          lessonsParams.endTime.toISOString()
        )
      );
  };

  const updateTeacherHandler = async (data) => {
    await dispatch(fetchUpdateTeacherInLessons(lessonsParams.groupId, data));
    dispatch(
      fetchLessonsByGroupId(
        lessonsParams.groupId,
        lessonsParams.startTime.toISOString(),
        lessonsParams.endTime.toISOString()
      )
    );
    lessonsParams.teacherId &&
      dispatch(
        getTeachersLessons(
          lessonsParams.teacherId,
          lessonsParams.startTime.toISOString(),
          lessonsParams.endTime.toISOString()
        )
      );
  };

  const closeInfoModalHandler = () => {
    dispatch(clearUpdateTeacherError());
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
        bussyLessons={teachersLessons}
        lessonsParams={lessonsParams}
        addLessonHandler={lessonsParams.groupId && lessonsParams.teacherId && addLessonHandler}
        lessons={lessons}
        deleteLessonHandler={deleteLessonHandler}
        updateTeacherHandler={updateTeacherHandler}
      />
      <InfoModal
        open={!!updateTeacherError}
        title='Error'
        content={updateTeacherError ? updateTeacherError.error : ''}
        handleClose={closeInfoModalHandler}
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
