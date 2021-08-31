import React from 'react';
import StudentForm from './StudentForm';
import { useDispatch, useSelector } from 'react-redux';
import { addNewStudent } from '../../../store/actions/studentsAction';

const CreateStudentForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.students.error);

  const addStudent = (student) => {
    dispatch(addNewStudent(student));
  };

  return <StudentForm title={'Добавить ученика'} submitData={addStudent} error={error} />;
};

export default CreateStudentForm;
