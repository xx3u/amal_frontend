import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import TeacherForm from './TeacherForm';
import { useDispatch, useSelector } from 'react-redux';
import { editTeacher, getTeacherById } from '../../../store/actions/teachersActions';

const EditTeacherForm = () => {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teachers.teacher);
  const params = useParams();
  const paramsId = params.id;

  useEffect(() => {
    dispatch(getTeacherById(paramsId));
  }, [dispatch, paramsId]);

  const updateTeacher = (teacherForUpdate, id) => {
    dispatch(editTeacher(teacherForUpdate, id));
  };

  return (
    <TeacherForm title='Редактировать учителя' submitData={updateTeacher} selectedTeacher={teacher} id={paramsId} />
  );
};

export default EditTeacherForm;
