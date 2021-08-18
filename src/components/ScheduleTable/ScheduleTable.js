import React, { useState, useEffect } from 'react';
import { getTimeStringInDoubleFigures } from '../../helpers/getTimeStringInDoubleFigures';
import TableWithCard from './TableWithCard/TableWithCard';
import { getDateWithTime } from '../../helpers/getDateWithTime';
import { addDays, getDay } from 'date-fns';
import DeleteModal from '../UI/DeleteModal/DeleteModal';
import CustomCard from './CustomCard/CustomCard';

const ScheduleTable = ({ selectedParams, onClickHandler, lessons, deleteLessonHandler }) => {
  const times = [9, 10, 11, 12, 14, 15, 16, 17];
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const [open, setOpen] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState(null);

  const openDeleteModal = (e, id) => {
    e.stopPropagation();
    setOpen(true);
    setCurrentLessonId(id);
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
        };
      });
    });
    return copyLessons;
  };

  const initWeekLessons = setCellsTimes(times, days, {}, selectedParams.startTime, true);

  const [weekLessons, setWeekLessons] = useState(initWeekLessons);

  const renderCell = (row) => {
    return (
      <CustomCard
        id={row.id || ''}
        title={row.group || row.subject}
        subheader={row.teacher || row.subject}
        onClickHandler={() => {
          onClickHandler(row.startTime, row.endTime);
        }}
        onDeleteHandler={row.id && ((e) => openDeleteModal(e, row.id))}
      />
    );
  };

  const columns = [
    { fieldId: 'slot', headerName: 'Время', width: 100 },
    { fieldId: 'mon', headerName: 'Пн', width: 50, renderCell },
    { fieldId: 'tue', headerName: 'Вт', width: 50, renderCell },
    { fieldId: 'wed', headerName: 'Ср', width: 50, renderCell },
    { fieldId: 'thu', headerName: 'Чт', width: 50, renderCell },
    { fieldId: 'fri', headerName: 'Пт', width: 50, renderCell },
    { fieldId: 'sat', headerName: 'Сб', width: 50, renderCell },
    { fieldId: 'sun', headerName: 'Вс', width: 50, renderCell },
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
    if (lessons.length > 0) {
      days.forEach((day, index) => {
        lessons.forEach((lesson) => {
          const lessonStartDate = new Date(lesson.startTime);
          const startTime = lessonStartDate.getUTCHours();
          let lessonweekDay = getDay(lessonStartDate);
          lessonweekDay = lessonweekDay === 0 ? 7 : lessonweekDay;
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
                    group: lesson.Group?.groupName,
                  },
                },
              };
            });
          }
        });
      });
    }
  }, [lessons]);

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
      <TableWithCard columns={columns} rows={rows} onClickHandler={onClickHandler} />
    </>
  );
};

export default ScheduleTable;
