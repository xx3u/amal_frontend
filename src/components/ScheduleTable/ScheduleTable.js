import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TableWithCard from './TableWithCard/TableWithCard';

const ScheduleTable = () => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const [weekLessons, setWeekLessons] = useState({
    lesson1: {
      slot: '09:00 - 10:00',
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {},
      sun: {},
    },
    lesson2: {
      slot: '10:00 - 11:00',
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {},
      sun: {},
    },
    lesson3: {
      slot: '11:00 - 12:00',
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {},
      sun: {},
    },
    lesson4: {
      slot: '12:00 - 13:00',
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {},
      sun: {},
    },
    lanchBreak: {
      slot: '',
      mon: '',
      tue: '',
      wed: '',
      thu: '',
      fri: '',
      sat: '',
      sun: '',
    },
    lesson5: {
      slot: '14:00 - 15:00',
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {},
      sun: {},
    },
    lesson6: {
      slot: '15:00 - 16:00',
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {},
      sun: {},
    },
    lesson7: {
      slot: '16:00 - 17:00',
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {},
      sun: {},
    },
    lesson8: {
      slot: '17:00 - 18:00',
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {},
      sun: {},
    },
  });

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
    lessons.forEach((lesson) => {
      console.log('weekDay: ', lesson && new Date(lesson.startTime).getDay());
      console.log('start time: ', lesson && new Date(lesson.startTime).getUTCHours());

      if (lesson) {
        const startTime = new Date(lesson.startTime).getUTCHours();
        const endTime = new Date(lesson.endTime).getUTCHours();
        const lessonweekDay = new Date(lesson.startTime).getDay();

        const curLesson = getLesson(startTime);
        console.log('cur lesson num: ', curLesson);

        setWeekLessons((prev) => {
          switch (lessonweekDay) {
            case 1:
              return {
                ...prev,
                [curLesson]: {
                  ...prev[curLesson],
                  mon: {
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
                    id: lesson.id,
                    subject: lesson.Subject.subjectName,
                    teacher: lesson.Teacher.firstName + +' ' + lesson.Teacher.lastName,
                  },
                },
              };
            case 3:
              return {
                ...prev,
                [curLesson]: {
                  ...prev[curLesson],
                  wed: {
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
  }, [lessons]);

  const rows = Object.keys(weekLessons).map((key) => {
    return weekLessons[key];
  });

  return (
    <>
      <TableWithCard columns={columns} rows={rows} />
    </>
  );
};

export default ScheduleTable;
