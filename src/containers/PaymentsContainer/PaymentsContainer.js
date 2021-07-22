import React, { useEffect } from 'react';
import PaymentsTable from '../../components/PaymetsTable/PaymentsTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments } from '../../store/actions/paymentAction';

const PaymentsContainer = () => {
  const dispatch = useDispatch();

  const { payments } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(fetchPayments());
  }, []);

  return <PaymentsTable paymentsData={payments} />;
};

export default PaymentsContainer;
