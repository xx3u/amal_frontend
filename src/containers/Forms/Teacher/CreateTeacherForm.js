import React from 'react';
import TeacherForm from './TeacherForm';
import { useDispatch } from 'react-redux';
import { addTeacher } from '../../../store/actions/teachersActions';

const CreateTeacherForm = () => {
  const dispatch = useDispatch();
  const teacher = {
    firstName: '',
    lastName: '',
    subject: '',
    language: '',
    telephone: '',
    email: '',
  };

  const addTeacherHandler = (teacher) => {
    dispatch(addTeacher(teacher));
  };

  return (
    <div className='CreateTeacherForm'>
      <TeacherForm title='Добавить учителя' submitData={addTeacherHandler} selectedTeacher={teacher} />
    </div>
  );
};

export default CreateTeacherForm;
