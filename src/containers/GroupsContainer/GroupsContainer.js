import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyAccordion from '../../components/UI/MyAccordion/MyAccordion';
import SimpleTable from '../../components/UI/SimpleTable/SimpleTable';
import { fetchGroups } from '../../store/actions/groupsAction';

const GroupsContainer = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.groups.groups);

  const columns = [
    { field: 'firstName', headerName: 'Имя', width: 150 },
    { field: 'lastName', headerName: 'Фамилия', width: 200 },
    { field: 'grade', headerName: 'Класс', type: 'number', width: 120 },
  ];

  const students = [
    { id: 1, firstName: 'Серік', lastName: 'Ахметов', grade: 5 },
    { id: 2, firstName: 'Арман', lastName: 'Тасболат', grade: 2 },
  ];

  useEffect(() => {
    dispatch(fetchGroups());
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
