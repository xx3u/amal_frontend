import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableItems from '../../components/TableItems/TableItems';
import { fetchGroups } from '../../store/actions/groupsAction';

const GroupsContainer = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'groupName', headerName: 'Наименование', width: 200 },
  ];

  const rows = useSelector((state) => state.groups.groups);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return <TableItems rows={rows} columns={columns} />;
};

export default GroupsContainer;
