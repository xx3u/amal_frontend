import React, { useEffect } from 'react';
import SimpleTable from '../../components/UI/SimpleTable/SimpleTable';
import { useSelector, useDispatch } from 'react-redux';
import { getPaymentsByStudentId } from './../../store/actions/paymentAction';
import { format } from 'date-fns';
import { Grid, Typography } from '@material-ui/core';
import { getStudentById } from './../../store/actions/studentsAction';

const PaymentsByStudentId = ({ id }) => {
  const payments = useSelector((state) => state.payments.paymentsByStudent);
  const dispatch = useDispatch();
  const changedPayments = payments.map((payment) => {
    return {
      ...payments,
      date: format(new Date(payment.date), 'MM-dd-yyyy'),
      id: payment.id,
      amount: payment.amount,
      comment: payment.comment,
    };
  });
  const student = useSelector((state) => state.students.student);

  useEffect(() => {
    dispatch(getPaymentsByStudentId(id));
    dispatch(getStudentById(id));
  }, [id]);

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'date', headerName: 'Дата оплаты' },
    { field: 'amount', headerName: 'Сумма оплаты', type: 'number' },
    { field: 'comment', headerName: 'Комментарий' },
  ];

  return (
    <Grid item xs={12}>
      <Typography
        variant='h5'
        paragraph={true}
      >{`Детализация оплат по студенту: ${student.firstName} ${student.lastName}`}</Typography>
      <SimpleTable columns={columns} rows={changedPayments} />
    </Grid>
  );
};

export default PaymentsByStudentId;
