import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import FormItem from '../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../components/UI/Form/FormSubmission/FormSubmission';
import { addNewStudent, getStudentById } from '../../store/actions/studentsAction';

const StudentForm = (props) => {
  const dispatch = useDispatch();
  const editUrl = props.match.url.includes('edit');
  const id = props.match.url.split('/')[4];
  const selectedStudent = useSelector((state) => state.students.student);

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    grade: '',
    language: '',
    school: '',
    parentsContacts: '',
    stream: '',
    address: '',
    telephone: '',
    email: '',
  });

  useEffect(() => {
    dispatch(getStudentById(id));
  }, [dispatch]);

  useEffect(() => {
    editUrl ? setStudent(selectedStudent) : setStudent(student);
  }, [editUrl, selectedStudent]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(addNewStudent(student));
  };

  return (
    <FormSubmission
      title={editUrl ? 'Редактировать ученика' : 'Добавить ученика'}
      maxWidth='md'
      onSubmit={submitFormHandler}
    >
      <Grid item xs={4}>
        <FormItem
          name='firstName'
          value={student.firstName || ''}
          onChange={inputChangeHandler}
          label='Имя'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={4}>
        <FormItem
          name='lastName'
          value={student.lastName}
          onChange={inputChangeHandler}
          label='Фамилия'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={4}>
        <FormItem
          name='middleName'
          value={student.middleName}
          onChange={inputChangeHandler}
          label='Отчество'
          type='text'
        />
      </Grid>
      <Grid item xs={3}>
        <FormItem
          name='grade'
          value={student.grade}
          onChange={inputChangeHandler}
          label='Класс'
          type='integer'
          required
        />
      </Grid>
      <Grid item xs={3}>
        <FormItem
          name='language'
          value={student.language}
          onChange={inputChangeHandler}
          label='Язык обучения'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem name='school' value={student.school} onChange={inputChangeHandler} label='Школа' type='text' />
      </Grid>
      <Grid item xs={12}>
        <FormItem
          name='parentsContacts'
          value={student.parentsContacts}
          onChange={inputChangeHandler}
          label='Контакты родителей'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormItem
          name='stream'
          value={student.stream}
          onChange={inputChangeHandler}
          label='Направление'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormItem name='address' value={student.address} onChange={inputChangeHandler} label='Адрес' type='text' />
      </Grid>
      <Grid item xs={6}>
        <FormItem
          name='telephone'
          value={student.telephone}
          onChange={inputChangeHandler}
          label='Телефон'
          type='text'
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem name='email' value={student.email} onChange={inputChangeHandler} label='Email' type='text' />
      </Grid>
    </FormSubmission>
  );
};

export default StudentForm;
