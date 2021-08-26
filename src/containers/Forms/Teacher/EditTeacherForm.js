import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import TeacherForm from './TeacherForm';
import { useDispatch, useSelector } from 'react-redux';
import { editTeacher, getTeacherById } from '../../../store/actions/teachersActions';

const EditTeacherForm = () => {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teachers.teacher);
  const error = useSelector((state) => state.teachers.error);
  const params = useParams();
  const paramsId = params.id;

  useEffect(() => {
    dispatch(getTeacherById(paramsId));
  }, [dispatch, paramsId]);

  const updateTeacherHandler = (teacherForUpdate, id) => {
    dispatch(editTeacher(teacherForUpdate, id));
  };

  return (
    <TeacherForm
      title='Редактировать учителя'
      submitData={updateTeacherHandler}
      selectedTeacher={teacher}
      id={paramsId}
      error={error}
    />
  );
};

export default EditTeacherForm;
