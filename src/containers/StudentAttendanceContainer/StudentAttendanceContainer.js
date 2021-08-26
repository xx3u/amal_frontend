import { Grid, Checkbox } from '@material-ui/core';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTable from '../../components/UI/SimpleTable/SimpleTable';
import { transformToUTC } from '../../helpers/helpers';
import StudentAttendanceSelects from './StudentAttendanceSelects';
import { addAttendance, removeAttendance } from '../../store/actions/lessonsAction';

const StudentAttendanceContainer = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const lessons = useSelector((state) => state.lessons.lessons);

  const lesssonByTeacher = lessons.filter(({ teacherId }) => selectedTeacher?.id === teacherId);

  const lessonsByDate = lesssonByTeacher.reduce((acc, lesson) => {
    return { ...acc, [lesson.startTime]: lesson };
  }, {});

  const onSelectedGroupHandler = (selectedGroup) => {
    setStudents(selectedGroup?.Students || []);
  };
  const onSelectedTeacherHandler = (selectedTeacher) => {
    setSelectedTeacher(selectedTeacher);
  };

  const rows = students.map((student) => {
    return { id: student.id, studentName: `${student.lastName} ${student.firstName} `, ...lessonsByDate };
  });

  const createChangeHandler = (lessonId, studentId) => {
    return (e) => {
      if (e.target.checked) {
        dispatch(addAttendance(lessonId, studentId));
      } else dispatch(removeAttendance(lessonId, studentId));
    };
  };

  const LessonColumns = lesssonByTeacher
    .sort((a, b) => {
      return new Date(a.startTime) - new Date(b.startTime);
    })
    .map((lesson) => {
      return {
        field: lesson.startTime,
        headerName: format(transformToUTC(new Date(lesson.startTime)), 'dd MMM hh:mm', { locale: ru }),
        width: 100,
        renderCell(cell, row) {
          return (
            <Checkbox
              onChange={createChangeHandler(cell?.id, row.id)}
              color='primary'
              checked={cell?.Students.map(({ id }) => id).includes(row.id)}
            />
          );
        },
      };
    });

  const columns = [
    {
      field: 'studentName',
      headerName: rows.length ? 'ФИО' : 'Нет данных',
      width: 100,
      align: 'left',
    },
    ...LessonColumns,
  ];

  return (
    <>
      <Grid container item spacing={3}>
        <StudentAttendanceSelects
          onSelectedTeacherHandler={onSelectedTeacherHandler}
          onSelectedGroupHandler={onSelectedGroupHandler}
        />

        <Grid item xs={12}>
          <SimpleTable rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </>
  );
};

export default StudentAttendanceContainer;
