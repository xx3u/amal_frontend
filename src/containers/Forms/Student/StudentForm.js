import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';

const StudentForm = ({ title, submitData, selectedStudent, id }) => {
  const [student, setStudent] = useState(selectedStudent);

  useEffect(() => {
    setStudent(selectedStudent);
  }, [selectedStudent]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    id ? submitData(id, student) : submitData(student);
  };

  return (
    <FormSubmission title={title} maxWidth='md' onSubmit={submitFormHandler}>
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
          value={student.lastName || ''}
          onChange={inputChangeHandler}
          label='Фамилия'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={4}>
        <FormItem
          name='middleName'
          value={student.middleName || ''}
          onChange={inputChangeHandler}
          label='Отчество'
          type='text'
        />
      </Grid>
      <Grid item xs={3}>
        <FormItem
          name='grade'
          value={student.grade || ''}
          onChange={inputChangeHandler}
          label='Класс'
          type='integer'
          required
        />
      </Grid>
      <Grid item xs={3}>
        <FormItem
          name='language'
          value={student.language || ''}
          onChange={inputChangeHandler}
          label='Язык обучения'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem name='school' value={student.school || ''} onChange={inputChangeHandler} label='Школа' type='text' />
      </Grid>
      <Grid item xs={12}>
        <FormItem
          name='parentsContacts'
          value={student.parentsContacts || ''}
          onChange={inputChangeHandler}
          label='Контакты родителей'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormItem
          name='stream'
          value={student.stream || ''}
          onChange={inputChangeHandler}
          label='Направление'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormItem
          name='address'
          value={student.address || ''}
          onChange={inputChangeHandler}
          label='Адрес'
          type='text'
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem
          name='telephone'
          value={student.telephone || ''}
          onChange={inputChangeHandler}
          label='Телефон'
          type='text'
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem name='email' value={student.email || ''} onChange={inputChangeHandler} label='Email' type='text' />
      </Grid>
    </FormSubmission>
  );
};

export default StudentForm;
