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
    { field: 'stream', headerName: 'Направление', width: 170 },
    { field: 'school', headerName: 'Школа', width: 150 },
    { field: 'status', headerName: 'Статус', width: 150 },
    { field: 'grade', headerName: 'Класс', type: 'number', width: 120 },
    {
      field: 'Действия',
      sortable: false,
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: function cellEdit(params) {
        return (
          <div>
            <Button
              variant='contained'
              color='default'
              size='small'
              component={Link}
              to={`/admin-app/students/edit/${params.row.id}`}
            >
              Edit         
            </Button>
            <Button
              variant='contained'
              color='default'
              size='small'
              component={Link}
              to={`/admin-app/students/${params.row.id}`}
            >
              Детали         
            </Button>
          </div>
        );
      },
    },
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
