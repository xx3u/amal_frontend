import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Edit as EditIcon, DeleteForever } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { deleteTeacher, fetchTeachers } from '../../store/actions/teachersActions';
import EnhancedTable from '../../components/UI/CustomTable/CustomTable';

const TeachersContainer = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachers);
  const changedTeachers = teachers.map((teacher) => {
    return { ...teacher, subjectName: teacher.Subject ? teacher.Subject.subjectName : '' };
  });

  const headCells = [
    { id: 'firstName', numeric: false, disablePadding: false, label: 'Имя' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Фамилия' },
    {
      id: 'language',
      numeric: false,
      disablePadding: false,
      label: 'Язык обучения',
    },
    { id: 'subjectName', numeric: false, disablePadding: false, label: 'Предмет' },
    {
      id: 'telephone',
      numeric: false,
      disablePadding: false,
      label: 'Телефон',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Эл. почта',
    },
    {
      id: 'editBtn',
      numeric: false,
      disablePadding: false,
      label: '',
      renderCell: function editBtn(row) {
        return (
          <IconButton component={Link} to={`/admin-app/teachers/${row.id}/edit`}>
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      id: 'deleteBtn',
      numeric: false,
      disablePadding: false,
      label: '',
      renderCell: function deleteBtn(row) {
        return (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              deleteBtnHandler(row.id);
            }}
          >
            <DeleteForever />
          </IconButton>
        );
      },
    },
  ];

  function deleteBtnHandler(teacherId) {
    dispatch(deleteTeacher(teacherId));
  }

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div className='TeachersContainer'>
      <EnhancedTable rows={changedTeachers} headCells={headCells} tableTitle='Учителя' numberOfRows={10} />
    </div>
  );
};

export default TeachersContainer;
