import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import StudentsContainer from '../../containers/StudentsContainer/StudentsContainer';
import Actions from '../../components/Students/Actions/Actions';
import Search from '../../components/Students/Search/Search';

const StudentsPage = () => {
  return (
    <div>
      <h1>Ученики</h1>
      <Actions>
        <Button variant='contained' component={Link} to='/admin-app/students/add' color='default'>
          Добавить нового ученика
        </Button>
        <Search />
      </Actions>
      <StudentsContainer />
    </div>
  );
};

export default StudentsPage;
