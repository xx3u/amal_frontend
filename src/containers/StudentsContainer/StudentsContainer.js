import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../../store/actions/studentsAction';
import EnhancedTable from '../../components/UI/CustomTable/CustomTable';

const StudentsContainer = () => {
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
      id: 'streamName',
      numeric: false,
      disablePadding: true,
      label: 'Направление',
    },
    {
      id: 'parentsContacts',
      numeric: false,
      disablePadding: true,
      label: 'Контакты родителей',
    },
    { id: 'groupName', numeric: false, disablePadding: true, label: 'Группа' },
    { id: 'grade', numeric: true, disablePadding: true, label: 'Класс' },
  ];

  const students = useSelector((state) => state.students.students);
  const changedStudents = students.map((student) => {
    return {
      ...student,
      streamName: student.Stream.name,
      groupName: student.Group ? student.Group.groupName : '',
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className='StudentsContainer'>
      <EnhancedTable
        rows={changedStudents}
        headCells={headCells}
        tableTitle='Студенты'
        numberOfRows={10}
        editBtn='visible'
        moreBtn='visible'
      />
    </div>
  );
};

export default StudentsContainer;
