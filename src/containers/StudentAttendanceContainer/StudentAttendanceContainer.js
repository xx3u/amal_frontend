import { Grid, Checkbox } from '@material-ui/core';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTable from '../../components/UI/SimpleTable/SimpleTable';
import { transformToUTC } from '../../helpers/helpers';
import StudentAttendanceSelects from './StudentAttendanceSelects';
import { addAttendance, removeAttendance } from '../../store/actions/lessonsAction';

const StudentAttendanceContainer = () => {
  const dispatch = useDispatch();

  const lessons = useSelector((state) => state.lessons.lessons);
  const params = useSelector((state) => state.lessons.lessonsParams);
  const students = useSelector((state) => state.lessons.lessonsParams.selectedGroup?.Students || []);
  const lesssonsByTeacher = lessons.filter(({ teacherId }) => params?.teacherId === teacherId);

  const lessonsByDate = lesssonsByTeacher.reduce((acc, lesson) => {
    return { ...acc, [lesson.startTime]: lesson };
  }, {});

  const onSelectedGroupHandler = (selectedGroup) => {
    setStudents(selectedGroup?.Students || []);
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

  const LessonColumns = lesssonsByTeacher
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
        <StudentAttendanceSelects onSelectedGroupHandler={onSelectedGroupHandler} />

        <Grid item xs={12}>
          <SimpleTable rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </>
  );
};

export default StudentAttendanceContainer;
