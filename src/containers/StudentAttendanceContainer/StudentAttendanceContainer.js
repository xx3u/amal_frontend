import { Grid } from '@material-ui/core';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTable from '../../components/UI/SimpleTable/SimpleTable';
import { transformToUTC } from '../../helpers/helpers';
import StudentAttendanceSelects from './StudentAttendanceSelects';

const StudentAttendanceContainer = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const lessons = useSelector((state) =>
    state.lessons.lessons.sort((a, b) => {
      return new Date(a.startTime) - new Date(b.startTime);
    })
  );

  const objLessons = lessons.reduce((lessons, lesson) => {
    return { ...lessons, [lesson.startTime]: lesson.id };
  }, {});

  const onSelectedGroupHandler = (selectedGroup) => {
    console.log(selectedGroup);
    selectedGroup?.Students && setStudents(selectedGroup.Students);
  };

  const rows = students.map((student) => {
    return { studentName: `${student.lastName} ${student.firstName} `, ...objLessons };
  });

  console.log('rows:', rows);
  console.log('students:', students);

  console.log(lessons);

  const LessonColumns = lessons.map((lesson) => {
    console.log(lesson.startTime);
    return {
      field: lesson.startTime,
      headerName: format(transformToUTC(new Date(lesson.startTime)), 'dd MMM hh:mm', { locale: ru }),
      width: 100,
    };
  });

  const columns = [
    {
      field: 'studentName',
      headerName: 'ФИО',
      width: 100,
    },
    ...LessonColumns,
  ];

  return (
    <>
      <Grid container item spacing={3}>
        <StudentAttendanceSelects onSelectedGroupHandler={onSelectedGroupHandler} />
      </Grid>

      <SimpleTable rows={rows} columns={columns} />
    </>
  );
};

export default StudentAttendanceContainer;
