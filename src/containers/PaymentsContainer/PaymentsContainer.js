import React, { useEffect } from 'react';
import PaymentsTable from '../../components/PaymetsTable/PaymentsTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../../store/actions/studentsAction';

const PaymentsContainer = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  const lastPayments = [];
  students.map((student) => {
    if (student.LastPayment[0]) {
      lastPayments.push({
        id: student.LastPayment[0].id,
        student: `${student.firstName} ${student.lastName}`,
        date: student.LastPayment[0].date,
        amount: student.LastPayment[0].amount,
        status: student.LastPayment[0].status ? 'Оплачено' : 'Неоплачено',
        comment: student.LastPayment[0].comment,
        studentId: student.id,
      });
    }
    return lastPayments;
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return <PaymentsTable paymentsData={lastPayments} />;
};

export default PaymentsContainer;
