import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Actions from '../../components/Students/Actions/Actions';
import TeachersContainer from '../../containers/TeachersContainer/TeachersContainer';

const useStyles = makeStyles(() => ({
  main: {
    marginTop: 20,
  },
}));

const TeachersPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Actions>
        <Button variant='contained' component={Link} to='/admin-app/teachers/add' color='default'>
          Добавить учителя
        </Button>
      </Actions>
      <TeachersContainer />
    </div>
  );
};

export default TeachersPage;
