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
      id: 'telephone',
      numeric: false,
      disablePadding: true,
      label: 'Телефон',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: true,
      label: 'Эл. почта',
    },
    {
      id: 'editBtn',
      numeric: false,
      disablePadding: true,
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
      disablePadding: true,
      label: '',
      renderCell: function deleteBtn(row) {
        return (
          <IconButton
            onClick={() => {
              deleteTeacherById(row.id);
            }}
          >
            <DeleteForever />
          </IconButton>
        );
      },
    },
  ];

  async function deleteTeacherById(teacherId) {
    await dispatch(deleteTeacher(teacherId));
    await dispatch(fetchTeachers());
  }

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div className='TeachersContainer'>
      <EnhancedTable
        rows={teachers}
        headCells={headCells}
        tableTitle='Учителя'
        numberOfRows={10}
        editBtn='visible'
        moreBtn='visible'
      />
    </div>
  );
};

export default TeachersContainer;
