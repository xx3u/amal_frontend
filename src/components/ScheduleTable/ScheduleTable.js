import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTimeStringInDoubleFigures } from '../../helpers/getTimeStringInDoubleFigures';
import TableWithCard from './TableWithCard/TableWithCard';
import { getDateWithTime } from '../../helpers/getDateWithTime';
import { addDays } from '../../helpers/addDays';

const ScheduleTable = ({ selectedParams, onClickHandler }) => {
  const lessons = useSelector((state) => state.lessons.lessons);

  const times = [9, 10, 11, 12, 14, 15, 16, 17];
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const initWeekLessons = {};

  const setCellsTimes = (times, days, lessons, monday, setSlot = false) => {
    times.forEach((time, index) => {
      const lesson = `lesson${index + 1}`;
      if (!setSlot) {
        const startTimeString = getTimeStringInDoubleFigures(time);
        const endTimeString = getTimeStringInDoubleFigures(time + 1);
        lessons[lesson] = { slot: `${startTimeString} - ${endTimeString}` };
      }
      days.forEach((day, dayIndex) => {
        lessons[lesson][day] = {
          startTime: monday ? getDateWithTime(addDays(monday, dayIndex), time, 0) : null,
          endTime: monday ? getDateWithTime(addDays(monday, dayIndex), time + 1, 0) : null,
        };
      });
    });
  };

  setCellsTimes(times, days, initWeekLessons, true);

  const [weekLessons, setWeekLessons] = useState(initWeekLessons);

  const columns = [
    { field: 'slot', headerName: 'Время', width: 100 },
    { field: 'mon', headerName: 'Пн', width: 50 },
    { field: 'tue', headerName: 'Вт', width: 50 },
    { field: 'wed', headerName: 'Ср', width: 50 },
    { field: 'thu', headerName: 'Чт', width: 50 },
    { field: 'fri', headerName: 'Пт', width: 50 },
    { field: 'sat', headerName: 'Сб', width: 50 },
    { field: 'sun', headerName: 'Вс', width: 50 },
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
    const monday = selectedParams.startTime;
    setWeekLessons((prev) => {
      const copyLessons = { ...prev };
      setCellsTimes(times, days, copyLessons, monday);
      return copyLessons;
    });
  }, [selectedParams.startTime, selectedParams.groupId]);

  useEffect(() => {
    if (!lessons.length) {
      setWeekLessons(initWeekLessons);
    } else {
      days.forEach((day, index) => {
        lessons.forEach((lesson) => {
          const startTime = new Date(lesson.startTime).getUTCHours();

          const lessonweekDay = new Date(lesson.startTime).getDay();
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
                    teacher: lesson.Teacher.firstName + ' ' + lesson.Teacher.lastName,
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

  return <TableWithCard columns={columns} rows={rows} onClickHandler={onClickHandler} />;
};

export default ScheduleTable;
