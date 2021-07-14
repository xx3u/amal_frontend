import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StudentsTable from '../../components/TableItems/TableItems';
import { fetchStudents } from '../../store/actions/studentsAction';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const StudentsContainer = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'Имя', width: 150 },
    { field: 'lastName', headerName: 'Фамилия', width: 200 },
    { field: 'language', headerName: 'Язык обучения', width: 180 },
    { field: 'streamName', headerName: 'Направление', width: 170 },
    { field: 'parentsContacts', headerName: 'Контакты родителей', width: 250 },
    { field: 'status', headerName: 'Статус', width: 150 },
    { field: 'grade', headerName: 'Класс', type: 'number', width: 120 },
    {
      field: 'Действия',
      sortable: false,
      width: 120,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: function cellEdit(params) {
        return (
          <Button
            variant='contained'
            color='default'
            size='small'
            component={Link}
            to={`/admin-app/students/${params.row.id}/edit`}
          >
            Edit         
          </Button>
        );
      },
    },
  ];

  const students = useSelector((state) => state.students.students);
  const changedStudents = students.map((student) => {
    return { ...student, streamName: student.Stream.name };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className='StudentsContainer'>
      <StudentsTable rows={changedStudents} columns={columns} />
    </div>
  );
};

export default StudentsContainer;
