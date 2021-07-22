import React, { useState } from 'react';
import StudentForm from './StudentForm';
import { useDispatch } from 'react-redux';
import { addNewStudent } from '../../../store/actions/studentsAction';

const CreateStudentForm = () => {
  const student = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    grade: '',
    language: '',
    school: '',
    parentsContacts: '',
    streamId: '',
    status: 'В ожидании',
    groupId: null,
    address: '',
    telephone: '',
    email: '',
  });

  const dispatch = useDispatch();

  const addStudent = (student) => {
    dispatch(addNewStudent(student));
  };

  return <StudentForm title={'Добавить ученика'} submitData={addStudent} selectedStudent={student[0]} />;
};

export default CreateStudentForm;
