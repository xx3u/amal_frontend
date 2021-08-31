import React, { useState, useEffect } from 'react';
import { getTimeStringInDoubleFigures } from '../../helpers/getTimeStringInDoubleFigures';
import { getDateWithTime } from '../../helpers/getDateWithTime';
import { addDays, eachDayOfInterval, getISODay } from 'date-fns';
import DeleteModal from '../UI/DeleteModal/DeleteModal';
import LessonCard from './LessonCard/LessonCard';
import AddCard from './AddCard/AddCard';
import UpdateTeacher from '../../containers/Forms/Lesson/UpdateTeacher';
import SimpleTable from '../UI/SimpleTable/SimpleTable';
const ScheduleTable = ({
  lessonsParams,
  addLessonHandler,
  lessons,
  deleteLessonHandler,
  updateTeacherHandler,
  bussyLessons,
}) => {
  const times = [9, 10, 11, 12, 14, 15, 16, 17];
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  // console.log(eachDayOfInterval({ start: lessonsParams.startTime, end: lessonsParams.endTime }));
  const [open, setOpen] = useState(false);
  const [isOpenEditForm, setOpenEditForm] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [lessonData, setLessonData] = useState({
    startTime: null,
    oldTeacherId: null,
    oldTeacherName: '',
    subjectId: null,
  });

  const openDeleteModal = (e, id) => {
    e.stopPropagation();
    setOpen(true);
    setCurrentLessonId(id);
  };

  const openEditFormHandler = (e, teacherId, teacher, startTime, subjectId) => {
    e.stopPropagation();
    setOpenEditForm(true);
    setLessonData({
      startTime,
      oldTeacherId: teacherId,
      oldTeacherName: teacher,
      subjectId,
    });
  };

  const closeEditFormHandler = () => {
    setOpenEditForm(false);
  };

  const updateTeacherSubmit = (e, newTeacherId) => {
    e.preventDefault();
    const data = {
      startTime: lessonData.startTime,
      oldTeacherId: lessonData.oldTeacherId,
      newTeacherId,
    };
    updateTeacherHandler(data);
    closeEditFormHandler();
  };

  const closeDeleteModal = () => {
    setOpen(false);
  };

  const deleteButtonHandler = () => {
    deleteLessonHandler(currentLessonId);
    closeDeleteModal();
  };

  const setCellsTimes = (times, days, lessons, monday, setSlot = false) => {
    const copyLessons = { ...lessons };
    times.forEach((time, index) => {
      const lesson = `lesson${index + 1}`;
      copyLessons[lesson] = {};
      if (setSlot) {
        const startTimeString = getTimeStringInDoubleFigures(time);
        const endTimeString = getTimeStringInDoubleFigures(time + 1);
        copyLessons[lesson]['slot'] = `${startTimeString} - ${endTimeString}`;
      }
      days.forEach((day, dayIndex) => {
        copyLessons[lesson][day] = {
          startTime: monday ? getDateWithTime(addDays(monday, dayIndex), time, 0) : null,
          endTime: monday ? getDateWithTime(addDays(monday, dayIndex), time + 1, 0) : null,
          teacherBussy: false,
        };
      });
    });
    return copyLessons;
  };

  const initWeekLessons = setCellsTimes(times, days, {}, lessonsParams.startTime, true);

  const [weekLessons, setWeekLessons] = useState(initWeekLessons);

  const renderCell = (row) => {
    return row.id ? (
      <LessonCard
        id={row.id || ''}
        title={row.group || row.subject}
        subheader={row.teacher || row.subject}
        onDeleteHandler={deleteLessonHandler && row.id && ((e) => openDeleteModal(e, row.id))}
        onEditHandler={
          updateTeacherHandler &&
          row.id &&
          ((e) => openEditFormHandler(e, row.teacherId, row.teacher, row.startTime, row.subjectId))
        }
      />
    ) : (
      <AddCard
        disabled={row.teacherBussy || !addLessonHandler}
        onClickHandler={() => {
          addLessonHandler(row.startTime, row.endTime);
        }}
      />
    );
  };

  const columns = [
    { field: 'slot', headerName: 'Время', width: 100 },
    { field: 'mon', headerName: 'Пн', width: 50, renderCell },
    { field: 'tue', headerName: 'Вт', width: 50, renderCell },
    { field: 'wed', headerName: 'Ср', width: 50, renderCell },
    { field: 'thu', headerName: 'Чт', width: 50, renderCell },
    { field: 'fri', headerName: 'Пт', width: 50, renderCell },
    { field: 'sat', headerName: 'Сб', width: 50, renderCell },
    { field: 'sun', headerName: 'Вс', width: 50, renderCell },
  ];

  const getLesson = (startTime) => {
    if (startTime >= 9 && startTime < 10) {
      return 'lesson1';
    } else if (startTime >= 10 && startTime < 11) {
      return 'lesson2';
    } else if (startTime >= 11 && startTime < 12) {
      return 'lesson3';
    } else if (startTime >= 12 && startTime < 13) {
      return 'lesson4';
    } else if (startTime >= 14 && startTime < 15) {
      return 'lesson5';
    } else if (startTime >= 15 && startTime < 16) {
      return 'lesson6';
    } else if (startTime >= 16 && startTime < 17) {
      return 'lesson7';
    } else if (startTime >= 17 && startTime < 18) {
      return 'lesson8';
    }
  };

  useEffect(() => {
    setWeekLessons(initWeekLessons);
    days.forEach((day, index) => {
      lessons.forEach((lesson) => {
        const lessonStartDate = new Date(lesson.startTime);
        const startTime = lessonStartDate.getUTCHours();
        const lessonweekDay = getISODay(lessonStartDate);
        const curLesson = getLesson(startTime);
        if (index + 1 === lessonweekDay) {
          setWeekLessons((prev) => {
            return {
              ...prev,
              [curLesson]: {
                ...prev[curLesson],
                [day]: {
                  ...prev[curLesson][day],
                  id: lesson.id,
                  subject: lesson.Subject.subjectName,
                  teacher: lesson.Teacher ? lesson.Teacher?.firstName + ' ' + lesson.Teacher?.lastName : null,
                  group: lesson.Group ? lesson.Group.groupName : null,
                  groupId: lesson.groupId,
                  subjectId: lesson.subjectId,
                  teacherId: lesson.teacherId,
                },
              },
            };
          });
        }
      });
    });
  }, [lessons, bussyLessons]);

  useEffect(() => {
    bussyLessons &&
      days.forEach((day, index) => {
        bussyLessons.forEach((lesson) => {
          const lessonStartDate = new Date(lesson.startTime);
          const startTime = lessonStartDate.getUTCHours();
          const lessonweekDay = getISODay(lessonStartDate);
          const curLesson = getLesson(startTime);
          if (index + 1 === lessonweekDay) {
            setWeekLessons((prev) => {
              return {
                ...prev,
                [curLesson]: {
                  ...prev[curLesson],
                  [day]: {
                    ...prev[curLesson][day],
                    teacherBussy: !!lesson.id,
                  },
                },
              };
            });
          }
        });
      });
  }, [lessons, bussyLessons]);

  const rows = Object.keys(weekLessons).map((key) => {
    return weekLessons[key];
  });

  return (
    <>
      <DeleteModal
        open={open}
        deleteLessonHandler={deleteLessonHandler}
        currentLessonId={currentLessonId}
        deleteButtonHandler={deleteButtonHandler}
        handleClose={closeDeleteModal}
      />
      <SimpleTable columns={columns} rows={rows} />
      <UpdateTeacher
        isOpen={isOpenEditForm}
        handleClose={closeEditFormHandler}
        oldTeacherName={lessonData.oldTeacherName}
        startTime={lessonData.startTime}
        subjectId={lessonData.subjectId}
        updateTeacherSubmit={updateTeacherSubmit}
      />
    </>
  );
};

export default ScheduleTable;
