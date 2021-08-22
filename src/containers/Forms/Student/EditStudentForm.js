import React, { useEffect } from 'react';
import StudentForm from './StudentForm';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentById, updateStudent } from '../../../store/actions/studentsAction';
import { useParams } from 'react-router';

const EditStudentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const studentById = useSelector((state) => state.students.student);

  useEffect(() => {
    dispatch(getStudentById(id));
  }, [id]);

  const editStudent = (id, student) => {
    dispatch(updateStudent(id, student));
  };
  return <StudentForm title={'Редактировать ученика'} selectedStudent={studentById} id={id} submitData={editStudent} />;
};

export default EditStudentForm;
