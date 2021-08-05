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

  let initWeekLessons = {};
  times.forEach((time, index) => {
    const startTimeString = getTimeStringInDoubleFigures(time);
    const endTimeString = getTimeStringInDoubleFigures(time + 1);
    const lesson = `lesson${index + 1}`;
    initWeekLessons[lesson] = { slot: `${startTimeString} - ${endTimeString}` };
    days.forEach((day) => {
      initWeekLessons[lesson][day] = {
        startTime: null,
        endTime: null,
      };
    });
  });

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
    const monday = new Date(selectedParams.startTime);
    setWeekLessons((prev) => {
      const copyLessons = { ...prev };
      times.forEach((time, index) => {
        const lesson = `lesson${index + 1}`;
        days.forEach((day, dayIndex) => {
          copyLessons[lesson][day] = {
            startTime: getDateWithTime(addDays(monday, dayIndex), time, 0),
            endTime: getDateWithTime(addDays(monday, dayIndex), time + 1, 0),
          };
        });
      });
      return copyLessons;
    });
  }, [selectedParams]);

  useEffect(() => {
    if (!lessons.length) {
      setWeekLessons(initWeekLessons);
    } else {
      lessons.forEach((lesson) => {
        if (lesson) {
          const startTime = new Date(lesson.startTime).getHours();
          const lessonweekDay = new Date(lesson.startTime).getDay();

          const curLesson = getLesson(startTime);

          setWeekLessons((prev) => {
            switch (lessonweekDay) {
              case 1:
                return {
                  ...prev,
                  [curLesson]: {
                    ...prev[curLesson],
                    mon: {
                      ...prev[curLesson].mon,
                      id: lesson.id,
                      subject: lesson.Subject.subjectName,
                      teacher: lesson.Teacher.firstName + ' ' + lesson.Teacher.lastName,
                    },
                  },
                };
              case 2:
                return {
                  ...prev,
                  [curLesson]: {
                    ...prev[curLesson],
                    tue: {
                      ...prev[curLesson].tue,
                      id: lesson.id,
                      subject: lesson.Subject.subjectName,
                      teacher: lesson.Teacher.firstName + ' ' + lesson.Teacher.lastName,
                    },
                  },
                };
              case 3:
                return {
                  ...prev,
                  [curLesson]: {
                    ...prev[curLesson],
                    wed: {
                      ...prev[curLesson].wed,
                      id: lesson.id,
                      subject: lesson.Subject.subjectName,
                      teacher: lesson.Teacher.firstName + ' ' + lesson.Teacher.lastName,
                    },
                  },
                };
              case 4:
                return {
                  ...prev,
                  [curLesson]: {
                    ...prev[curLesson],
                    thu: {
                      ...prev[curLesson].thu,
                      id: lesson.id,
                      subject: lesson.Subject.subjectName,
                      teacher: lesson.Teacher.firstName + ' ' + lesson.Teacher.lastName,
                    },
                  },
                };
              case 5:
                return {
                  ...prev,
                  [curLesson]: {
                    ...prev[curLesson],
                    fri: {
                      ...prev[curLesson].fri,
                      id: lesson.id,
                      subject: lesson.Subject.subjectName,
                      teacher: lesson.Teacher.firstName + ' ' + lesson.Teacher.lastName,
                    },
                  },
                };
              case 6:
                return {
                  ...prev,
                  [curLesson]: {
                    ...prev[curLesson],
                    sat: {
                      ...prev[curLesson].sat,
                      id: lesson.id,
                      subject: lesson.Subject.subjectName,
                      teacher: lesson.Teacher.firstName + ' ' + lesson.Teacher.lastName,
                    },
                  },
                };
              case 7:
                return {
                  ...prev,
                  [curLesson]: {
                    ...prev[curLesson],
                    sun: {
                      ...prev[curLesson].sun,
                      id: lesson.id,
                      subject: lesson.Subject.subjectName,
                      teacher: lesson.Teacher.firstName + ' ' + lesson.Teacher.lastName,
                    },
                  },
                };
              default:
                break;
            }
          });
        }
      });
    }
  }, [lessons]);

  const rows = Object.keys(weekLessons).map((key) => {
    return weekLessons[key];
  });

  return <TableWithCard columns={columns} rows={rows} onClickHandler={onClickHandler} />;
};

export default ScheduleTable;
