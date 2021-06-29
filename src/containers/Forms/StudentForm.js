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

  return (
    <FormSubmission
      title="Добавить студента"
      maxWidth="md"
    >
      <Grid item xs={4}>
        <FormItem 
          name='firstName'
          value={newStudent.firstName}
          label='Имя'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={4}>
        <FormItem 
          name='lastName'
          value={newStudent.lastName}
          label='Фамилия'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={4}>
        <FormItem 
          name='middleName'
          value={newStudent.middleName}
          label='Отчество'
          type='text'
        />
      </Grid>
      <Grid item xs={3}>
        <FormItem 
          name='grade'
          value={newStudent.grade}
          label='Класс'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={3}>
        <FormItem 
          name='language'
          value={newStudent.language}
          label='Язык обучения'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem 
          name='school'
          value={newStudent.school}
          label='Школа'
          type='text'
        />
      </Grid>
      <Grid item xs={12}>
        <FormItem 
          name='parentsContacts'
          value={newStudent.parentsContacts}
          label='Контакты родителей'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormItem 
          name='stream'
          value={newStudent.stream}
          label='Направление'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormItem 
          name='address'
          value={newStudent.address}
          label='Адрес'
          type='text'
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem 
          name='telephone'
          value={newStudent.telephone}
          label='Телефон'
          type='text'
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem 
          name='email'
          value={newStudent.email}
          label='Email'
          type='text'
        />
      </Grid>
    </FormSubmission>
  )
};

export default StudentForm;