import React from 'react';
import { useSelector } from 'react-redux';
import TableItems from '../../components/TableItems/TableItems';

const GroupsContainer = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Наименование', width: 200 },
  ];

  const rows = useSelector((state) => state.groups.groups);

  return <TableItems rows={rows} columns={columns} />;
};

export default GroupsContainer;
