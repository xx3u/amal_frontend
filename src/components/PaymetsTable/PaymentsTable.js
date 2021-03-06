import React, { useState } from 'react';
import CustomTable from '../UI/CustomTable/CustomTable';
import { Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { format } from 'date-fns';
import EditPaymentForm from './../../containers/Forms/Payment/EditPaymentForm';
import { Link } from 'react-router-dom';

const PaymentsTable = ({ paymentsData }) => {
  const [isOpen, setIsOpen] = useState({ status: false });
  const [id, setId] = useState();

  const openPaymentForm = (e, id) => {
    e.stopPropagation();
    setIsOpen({ status: true });
    setId(id);
  };

  const headCells = [
    {
      id: 'student',
      numeric: false,
      disablePadding: false,
      label: 'ФИО',
    },

    {
      id: 'date',
      numeric: false,
      disablePadding: false,
      label: 'Дата платежа',
      renderCell: function date(row) {
        return format(new Date(row.date), 'MM/dd/yyyy');
      },
    },
    {
      id: 'amount',
      numeric: false,
      disablePadding: false,
      label: 'Сумма платежа',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Статус',
    },
    {
      id: 'comment',
      numeric: false,
      disablePadding: false,
      label: 'Комментарий',
    },
    {
      id: 'editBtn',
      numeric: false,
      disablePadding: false,
      label: '',
      renderCell: function editBtn(row) {
        return (
          <IconButton onClick={(e) => openPaymentForm(e, row.id)}>
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
          <Button variant='contained' component={Link} to={`/admin-app/payments/${row.studentId}`}>
            Детали
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <CustomTable rows={paymentsData} headCells={headCells} tableTitle='Платежи' numberOfRows={10} />
      <EditPaymentForm isOpen={isOpen} paymentId={id} />
    </>
  );
};

export default PaymentsTable;
