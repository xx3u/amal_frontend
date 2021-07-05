import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StudentsTable from '../../components/TableItems/TableItems';
import { fetchStudents } from '../../store/actions/studentsAction';

const StudentsContainer = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'Имя', width: 150 },
    { field: 'lastName', headerName: 'Фамилия', width: 200 },
    { field: 'language', headerName: 'Язык обучения', width: 180 },
    { field: 'stream', headerName: 'Направление', width: 170 },
    { field: 'school', headerName: 'Школа', width: 150 },
    { field: 'grade', headerName: 'Класс', type: 'number', width: 120 },
  ];

  const rows = useSelector((state) => state.students.students);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className='StudentsContainer'>
      <StudentsTable rows={rows} columns={columns} />
    </div>
  );
};

export default StudentsContainer;
