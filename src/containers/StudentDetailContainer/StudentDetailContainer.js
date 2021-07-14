import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { getStudentById } from '../../store/actions/studentsAction';
import StudentDetailItem from '../../components/StudentDetailItem/StudentDetailItem';

const StudentDetailContainer = ({ id }) => {
  const dispatch = useDispatch();
  const studentById = useSelector((state) => state.students.student);

  useEffect(() => {
    dispatch(getStudentById(id));
  }, [id]);

  return (
    <Grid container direction='column' justify='space-between'>
      <StudentDetailItem label='Имя:' info={studentById.firstName} />
      <StudentDetailItem label='Фамилия:' info={studentById.lastName} />
      <StudentDetailItem label='Отчество:' info={studentById.middleName} />
      <StudentDetailItem label='Класс:' info={studentById.grade} />
      <StudentDetailItem label='Язык:' info={studentById.language} />
      <StudentDetailItem label='Школа:' info={studentById.school} />
      <StudentDetailItem label='Контакты родителя(ей):' info={studentById.parentsContacts} />
      <StudentDetailItem label='Направление:' info={studentById.Stream.name} />
      <StudentDetailItem label='Группа:' info={studentById.Group ? studentById.Group.groupName : ''} />
      <StudentDetailItem label='Адрес:' info={studentById.address} />
      <StudentDetailItem label='Телефон:' info={studentById.telephone} />
      <StudentDetailItem label='Email:' info={studentById.email} />
      <StudentDetailItem label='Статус:' info={studentById.status} />
    </Grid>
  );
};

export default StudentDetailContainer;
