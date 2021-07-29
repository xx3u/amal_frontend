import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ActionsArea from '../../components/Students/ActionsArea/ActionsArea';
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
      <ActionsArea>
        <Button variant='contained' component={Link} to='/admin-app/teachers/add' color='default'>
          Добавить учителя
        </Button>
      </ActionsArea>
      <TeachersContainer />
    </div>
  );
};

export default TeachersPage;
