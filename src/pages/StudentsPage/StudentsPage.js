import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import StudentsContainer from '../../containers/StudentsContainer/StudentsContainer';

 
const StudentsPage = () => (
  <div>
      <h1>Ученики</h1>
      <Button component={Link}
                    to="/admin-app/students/add"
                    color="primary">
                      Добавить нового ученика
      </Button>
      <StudentsContainer/>
  </div>
);

export default StudentsPage;
