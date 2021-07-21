import React from 'react';
import CustomTable from '../UI/CustomTable/CustomTable';
import { IconButton } from '@material-ui/core';
import { EditIcon } from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const PaymentsTable = ({ paymentsData }) => {
  const headCells = [
    { id: 'FullName', numeric: false, disablePadding: true, label: 'ФИО' },
    {
      id: 'status',
      numeric: false,
      disablePadding: true,
      label: 'Статус оплаты',
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Дата платежа',
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
      renderCell: function editBtn(params) {
        return (
          <IconButton key={params} component={Link} to={`/admin-app/payments/${params}/edit`}>
            <EditIcon />
          </IconButton>
        );
      },
    },
  ];

  return <CustomTable rows={paymentsData} headCells={headCells} tableTitle='Платежи' numberOfRows={10} />;
};

export default PaymentsTable;
