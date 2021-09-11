import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EnhancedTable from '../../components/UI/CustomTable/CustomTable';
import { fetchStudents, getStudentsByParams } from '../../store/actions/studentsAction';
import { Button, makeStyles, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ActionsArea from '../../components/Students/ActionsArea/ActionsArea';
import Search from '../../components/Students/Search/Search';
import EditIcon from '@material-ui/icons/Edit';
import StatusIconText from '../../components/UI/StatusIconText/StatusIconText';

const useStyles = makeStyles((theme) => ({
  StudentsContainer: {
    marginTop: theme.spacing(4),
  },
}));

const StudentsContainer = () => {
  const classes = useStyles();

  const headCells = [
    { id: 'firstName', numeric: false, disablePadding: false, label: 'Имя' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Фамилия' },
    {
      id: 'language',
      numeric: false,
      disablePadding: false,
      label: 'Язык обучения',
    },
    {
      id: 'streamName',
      numeric: false,
      disablePadding: false,
      label: 'Направление',
    },
    {
      id: 'parentsContacts',
      numeric: false,
      disablePadding: false,
      label: 'Контакты родителей',
    },
    { id: 'groupName', numeric: false, disablePadding: false, label: 'Группа' },
    { id: 'grade', numeric: true, disablePadding: false, label: 'Класс' },
    {
      id: 'paymentStatus',
      numeric: false,
      disablePadding: false,
      label: 'Статус оплаты',
      renderCell: function paymentStatus(row) {
        return <StatusIconText status={row.paymentStatus} />;
      },
    },
    {
      id: 'editBtn',
      numeric: false,
      disablePadding: false,
      label: '',
      renderCell: function editBtn(row) {
        return (
          <IconButton component={Link} to={`/admin-app/students/${row.id}/edit`}>
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      id: 'detailBtn',
      numeric: false,
      disablePadding: false,
      label: '',
      renderCell: function detailBtn(row) {
        return (
          <Button
            variant='contained'
            color='default'
            size='small'
            component={Link}
            to={`/admin-app/students/${row.id}`}
          >
            Детали
          </Button>
        );
      },
    },
  ];

  const students = useSelector((state) => state.students.students);
  const changedStudents = students.map((student) => {
    return {
      ...student,
      streamName: student.Stream && student.Stream.name,
      groupName: student.Group ? student.Group.groupName : '',
      paymentStatus: student.LastPayment[0]?.status,
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
      <ActionsArea>
        <Button variant='contained' component={Link} to='/admin-app/students/add' color='default'>
          Добавить нового ученика
        </Button>
        <Search searchHandler={searchHandler} dropSearchHandler={dropSearchHandler} />
      </ActionsArea>
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
