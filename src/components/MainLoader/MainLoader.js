import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../UI/Preloader/Preloader';

const MainLoader = () => {
  const groupsLoading = useSelector((state) => state.groups.loading);
  const lessonsLoading = useSelector((state) => state.lessons.loading);
  const paymentsLoading = useSelector((state) => state.payments.loading);
  const studentsLoading = useSelector((state) => state.students.loading);
  const subjectsLoading = useSelector((state) => state.subjects.loading);
  const teachersLoading = useSelector((state) => state.teachers.loading);

  const isOpen =
    groupsLoading || lessonsLoading || paymentsLoading || studentsLoading || subjectsLoading || teachersLoading;

  return <Preloader isOpen={isOpen} />;
};

export default MainLoader;
