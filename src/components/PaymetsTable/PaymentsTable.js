import React from 'react';
import CustomTable from '../UI/CustomTable/CustomTable';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
const PaymentsTable = ({ paymentsData }) => {
  const headCells = [
    { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
    {
      id: 'Student',
      numeric: false,
      disablePadding: true,
      label: 'ФИО',
      renderCell: function editBtn(row) {
        return `${row.Student.lastName} ${row.Student.firstName}`;
      },
    },

    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Дата платежа',
      renderCell: function editBtn(row) {
        return format(new Date(row.date), 'MM/dd/yyyy');
      },
    },
    {
      id: 'amount',
      numeric: false,
      disablePadding: true,
      label: 'Сумма платежа',
    },
    {
      id: 'editBtn',
      numeric: false,
      disablePadding: true,
      label: '',
      renderCell: function editBtn(row) {
        return (
          <IconButton component={Link} to={`/admin-app/payments/${row.id}/edit`}>
            <EditIcon />
          </IconButton>
        );
      },
    },
  ];

  return <CustomTable rows={paymentsData} headCells={headCells} tableTitle='Платежи' numberOfRows={10} />;
};

export default PaymentsTable;
