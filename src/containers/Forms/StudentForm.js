import { useState } from 'react';
import FormItem from '../../components/UI/Form/FormItem/FormItem';

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
    <>
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
    </>
  )
};

export default StudentForm;

export default StudentForm;