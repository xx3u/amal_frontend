import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyAccordion from '../../components/UI/MyAccordion/MyAccordion';
import SimpleTable from '../../components/UI/SimpleTable/SimpleTable';
import { fetchGroups, fetchUpdateGroup } from '../../store/actions/groupsAction';

const GroupsContainer = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);

  const columns = [
    { field: 'firstName', headerName: 'Имя', width: 150 },
    { field: 'lastName', headerName: 'Фамилия', width: 200 },
    { field: 'grade', headerName: 'Класс', type: 'number', width: 120 },
  ];

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const onSaveTitleHandler = (id) => {
    return (value) => {
      dispatch(fetchUpdateGroup({ id, value: { groupName: value } }));
    };
  };

  return (
    <div className='GroupsContainer'>
      {groups.map((group) => {
        return (
          <MyAccordion key={group.id} groupName={group.groupName} onSaveTitle={onSaveTitleHandler(group.id)}>
            <SimpleTable rows={group.Students} columns={columns} />
          </MyAccordion>
        );
      })}
    </div>
  );
};

export default GroupsContainer;
