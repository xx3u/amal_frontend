import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyAccordion from '../../components/UI/MyAccordion/MyAccordion';
import SimpleTable from '../../components/UI/SimpleTable/SimpleTable';
import { fetchGroups } from '../../store/actions/groupsAction';
import { fetchStudents } from '../../store/actions/studentsAction';

const GroupsContainer = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.groups.groups);
  const students = useSelector((state) => state.students.students);

  const columns = [
    { field: 'firstName', headerName: 'Имя', width: 150 },
    { field: 'lastName', headerName: 'Фамилия', width: 200 },
    { field: 'grade', headerName: 'Класс', type: 'number', width: 120 },
  ];

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className='GroupsContainer'>
      {rows.map((row) => {
        return (
          <MyAccordion key={row.id} groupName={row.groupName}>
            <SimpleTable rows={students} columns={columns} />
          </MyAccordion>
        );
      })}
    </div>
  );
};

export default GroupsContainer;
