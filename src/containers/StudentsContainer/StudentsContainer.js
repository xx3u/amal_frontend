import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EnhancedTable from '../../components/UI/CustomTable/CustomTable';
import { fetchStudents, getStudentsByParams } from '../../store/actions/studentsAction';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Actions from '../../components/Students/Actions/Actions';
import Search from '../../components/Students/Search/Search';

const useStyles = makeStyles(() => ({
  StudentsContainer: {
    marginTop: 20,
  },
}));

const StudentsContainer = () => {
  const classes = useStyles();

  const headCells = [
    { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
    { id: 'firstName', numeric: false, disablePadding: true, label: 'Имя' },
    { id: 'lastName', numeric: false, disablePadding: true, label: 'Фамилия' },
    {
      id: 'language',
      numeric: false,
      disablePadding: true,
      label: 'Язык обучения',
    },
    {
      id: 'streamName',
      numeric: false,
      disablePadding: true,
      label: 'Направление',
    },
    {
      id: 'parentsContacts',
      numeric: false,
      disablePadding: true,
      label: 'Контакты родителей',
    },
    { id: 'groupName', numeric: false, disablePadding: true, label: 'Группа' },
    { id: 'grade', numeric: true, disablePadding: true, label: 'Класс' },
  ];

  const students = useSelector((state) => state.students.students);
  const changedStudents = students.map((student) => {
    return {
      ...student,
      streamName: student.Stream && student.Stream.name,
      groupName: student.Group ? student.Group.groupName : '',
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
    <div className={classes.StudentsContainer}>
      <Actions>
        <Button variant='contained' component={Link} to='/admin-app/students/add' color='default'>
          Добавить нового ученика
        </Button>
        <Search searchHandler={searchHandler} dropSearchHandler={dropSearchHandler} />
      </Actions>
      <EnhancedTable
        rows={changedStudents}
        headCells={headCells}
        tableTitle='Студенты'
        numberOfRows={10}
        editBtn='visible'
        moreBtn='visible'
      />
    </div>
  );
};

export default StudentsContainer;
