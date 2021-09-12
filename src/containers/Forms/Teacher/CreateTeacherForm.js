import React from 'react';
import TeacherForm from './TeacherForm';
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher } from '../../../store/actions/teachersActions';

const CreateTeacherForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.teachers.error);

  const addTeacherHandler = (teacher) => {
    dispatch(addTeacher(teacher));
  };

  return (
    <div className='CreateTeacherForm'>
      <TeacherForm title='Добавить учителя' submitData={addTeacherHandler} error={error} />
    </div>
  );
};

export default CreateTeacherForm;
