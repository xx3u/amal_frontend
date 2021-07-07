import React from 'react';
import TableItems from '../../components/TableItems/TableItems';

const GroupsContainer = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Наименование', width: 200 },
  ];

  const rows = [
    { id: 1, name: 'KZ01' },
    { id: 2, name: 'RU01' },
  ];

  return <TableItems rows={rows} columns={columns} />;
};

export default GroupsContainer;
