import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StudentsContainer from '../../containers/StudentsContainer/StudentsContainer';
import HeaderWrapper from '../../components/Students/HeaderWrapper/HeaderWrapper';

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginBottom: theme.spacing(4),
  },
}));

const StudentsPage = () => {
  const classes = useStyles();
  return (
    <div>
      <h1>Ученики</h1>
      <HeaderWrapper>
        <Button
          variant='contained'
          component={Link}
          to='/admin-app/students/add'
          color='default'
          className={classes.addButton}
        >
          Добавить нового ученика
        </Button>
      </HeaderWrapper>
      <StudentsContainer />
    </div>
  );
};

export default StudentsPage;
