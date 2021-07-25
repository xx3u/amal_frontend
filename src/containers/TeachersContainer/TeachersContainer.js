import React from 'react';
import EnhancedTable from '../../components/UI/CustomTable/CustomTable';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Edit as EditIcon, DeleteForever } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const TeachersContainer = () => {
  const dispatch = useDispatch();
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
          <IconButton component={Link} to={``}>
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
      renderCell: function detailBtn(row) {
        return (
          <IconButton>
            <DeleteForever />
          </IconButton>
        );
      },
    },
  ];
  return (
    <div className='TeachersContainer'>
      <EnhancedTable
        rows={[]}
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
