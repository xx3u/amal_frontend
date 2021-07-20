import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StudentsTable from '../../components/TableItems/TableItems';
import { fetchStudents, getStudentsByParams } from '../../store/actions/studentsAction';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Actions from '../../components/Students/Actions/Actions';
import Search from '../../components/Students/Search/Search';

const StudentsContainer = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "Имя", width: 150 },
    { field: "lastName", headerName: "Фамилия", width: 200 },
    { field: "language", headerName: "Язык обучения", width: 180 },
    { field: "streamName", headerName: "Направление", width: 170 },
    { field: "parentsContacts", headerName: "Контакты родителей", width: 250 },
    { field: "status", headerName: "Статус", width: 150 },
    { field: "groupName", headerName: "Группа", width: 130 },
    { field: "grade", headerName: "Класс", type: "number", width: 120 },
    {
      field: "Действия",
      sortable: false,
      width: 260,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: function cellEdit(params) {
        return (
          <Grid container direction="row" justify="space-evenly">
            <Button
              variant="contained"
              color="default"
              size="small"
              component={Link}
              to={`/admin-app/students/${params.row.id}/edit`}
            >
              Edit         
            </Button>
            <Button
              variant="contained"
              color="default"
              size="small"
              component={Link}
              to={`/admin-app/students/${params.row.id}`}
            >
              Детали         
            </Button>
          </Grid>
        );
      },
    },
  ];

  const students = useSelector((state) => state.students.students);
  const changedStudents = students.map((student) => {
    return {
      ...student,
      streamName: student.Stream && student.Stream.name,
      groupName: student.Group ? student.Group.groupName : "",
    };
  });

  const dispatch = useDispatch();

  const searchHandler = (firstName, lastName) => {
    dispatch(getStudentsByParams(firstName, lastName));
  };

  const dropSearchHandler = () => {
    dispatch(fetchStudents());
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className='StudentsContainer'>
      <Actions>
        <Button variant='contained' component={Link} to='/admin-app/students/add' color='default'>
          Добавить нового ученика
        </Button>
        <Search searchHandler={searchHandler} dropSearchHandler={dropSearchHandler} />
      </Actions>
      <StudentsTable rows={changedStudents} columns={columns} />
    </div>
  );
};

export default StudentsContainer;
