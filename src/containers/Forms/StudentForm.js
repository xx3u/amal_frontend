import { useState } from 'react';
import FormItem from '../../components/UI/Form/FormItem/FormItem';
import FormSubmission from './../../components/UI/Form/FormSubmission/FormSubmission';
import { Grid } from '@material-ui/core';

const StudentForm = () => {
  const [newStudent, setNewStudent] = useState({
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
    email: ''
  });

  const inputChangeHandler = e => {
    const {name, value} = e.target;
    setNewStudent({...newStudent, [name]: value});
  };

  return (
    <FormSubmission
      title="Добавить студента"
      maxWidth="md"
    >
      <Grid item xs={4}>
        <FormItem 
          name='firstName'
          value={newStudent.firstName}
          onChange={inputChangeHandler}
          label='Имя'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={4}>
        <FormItem 
          name='lastName'
          value={newStudent.lastName}
          onChange={inputChangeHandler}
          label='Фамилия'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={4}>
        <FormItem 
          name='middleName'
          value={newStudent.middleName}
          onChange={inputChangeHandler}
          label='Отчество'
          type='text'
        />
      </Grid>
      <Grid item xs={3}>
        <FormItem 
          name='grade'
          value={newStudent.grade}
          onChange={inputChangeHandler}
          label='Класс'
          type='integer'
          required
        />
      </Grid>
      <Grid item xs={3}>
        <FormItem 
          name='language'
          value={newStudent.language}
          onChange={inputChangeHandler}
          label='Язык обучения'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem 
          name='school'
          value={newStudent.school}
          onChange={inputChangeHandler}
          label='Школа'
          type='text'
        />
      </Grid>
      <Grid item xs={12}>
        <FormItem 
          name='parentsContacts'
          value={newStudent.parentsContacts}
          onChange={inputChangeHandler}
          label='Контакты родителей'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormItem 
          name='stream'
          value={newStudent.stream}
          onChange={inputChangeHandler}
          label='Направление'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormItem 
          name='address'
          value={newStudent.address}
          onChange={inputChangeHandler}
          label='Адрес'
          type='text'
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem 
          name='telephone'
          value={newStudent.telephone}
          onChange={inputChangeHandler}
          label='Телефон'
          type='text'
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem 
          name='email'
          value={newStudent.email}
          onChange={inputChangeHandler}
          label='Email'
          type='text'
        />
      </Grid>
    </FormSubmission>
  )
};

export default StudentForm;