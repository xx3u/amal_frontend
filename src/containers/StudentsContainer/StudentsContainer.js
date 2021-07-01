import React from 'react';
import StudentsTable from '../../components/TableItems/TableItems';

const columns = [
  { field: 'id', headerName: 'ID', width: 95, align: 'center', headerAlign: 'center'},
  { field: 'lastName', headerName: 'Фамилия', width: 200, headerAlign: 'center', },
  { field: 'firstName', headerName: 'Имя', width: 200, headerAlign: 'center', },
  { field: 'grade', headerName: 'Класс', type: 'number',width: 120, align: 'center', headerAlign: 'center',}, 
  { field: 'school', headerName: 'Школа', width: 200, align: 'center', headerAlign: 'center',}, 
  { field: 'language', headerName: 'Язык обучения', width: 230, align: 'center', headerAlign: 'center',}, 
  { field: 'parentContacts', headerName: 'Контакты родителей', width: 230, align: 'center', headerAlign: 'center',},
  { field: 'direction', headerName: 'Направление', width: 170, align: 'center', headerAlign: 'center',},
  { field: 'address', headerName: 'Адрес', width: 150, align: 'center', headerAlign: 'center',},
  { field: 'studentPhone', headerName: 'Телефон ученика', width: 190, align: 'center', headerAlign: 'center',},
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, grade: 5, school: 125, language: 'казахский', parentContacts: '+77075679145', direction: 'КТЛ', address: 'ул. Абая, 78', studentPhone: '+77077845986'},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, grade: 6, school: '78 школа им. М.Ауезова',  language: 'русский', parentContacts: '+77075679145', direction: 'РФМШ', address: 'ул. Абая, 78', studentPhone: '+77077845986'},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, grade: 7, school: '12 гимназия', language: 'казахский', parentContacts: '+77075679145', direction: 'НИШ', address: 'ул. Абая, 78', studentPhone: '+77077845986'},
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, grade: 7, school: 35, language: 'русский', parentContacts: '+77075679145', direction: 'КТЛ', address: 'ул. Абая, 78', studentPhone: '+77077845986'},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, grade: 5, school: 159, language: 'казахский', parentContacts: '+77075679145', direction: 'РФМШ', address: 'ул. Абая, 78', studentPhone: '+77077845986'},
];

const StudentsContainer = () => (
    <StudentsTable 
      rows={rows}
      columns={columns}
    />
);

export default StudentsContainer;
