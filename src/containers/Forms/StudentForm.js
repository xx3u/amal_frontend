import { useState } from 'react';
import FormItem from '../../components/UI/Form/FormItem/FormItem';
import FormSubmission from './../../components/UI/Form/FormSubmission/FormSubmission';

const StudentForm = () => {
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    grade: 5,
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
      <FormItem 
        name='firstName'
        value={newStudent.firstName}
        label='First Name'
        type='text'
      />
      <FormItem 
        name='lastName'
        value={newStudent.lastName}
        label='Last Name'
        type='text'
      />
    </FormSubmission>
  )
};

export default StudentForm;