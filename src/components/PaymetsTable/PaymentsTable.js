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
          <IconButton onClick={(e) => openPaymentForm(e, row.id)}>
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      id: 'detailBtn',
      numeric: false,
      disablePadding: true,
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
