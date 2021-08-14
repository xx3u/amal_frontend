import React from 'react';
import StudentForm from './StudentForm';
import { useDispatch } from 'react-redux';
import { addNewStudent } from '../../../store/actions/studentsAction';

const CreateStudentForm = () => {
  const dispatch = useDispatch();

  const addStudent = (student) => {
    dispatch(addNewStudent(student));
  };

  return <StudentForm title={'Добавить ученика'} submitData={addStudent} />;
};

export default CreateStudentForm;
