import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StudentsTable from '../../components/TableItems/TableItems';
import { fetchStudents } from '../../store/actions/studentsAction';

const StudentsContainer = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100, headerAlign: 'center', },
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
  
  const rows = useSelector(state => state.students.students)


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  return (
      <div className="StudentsContainer">
        <StudentsTable 
          rows={rows}
          columns={columns}
        />
      </div>
)}


export default StudentsContainer;
