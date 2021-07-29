import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateSubjectForm from '../../containers/Forms/Subject/CreateSubjectForm';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(4),
  },
  addBtn: {
    marginBottom: 20,
  },
}));

const TestSubjPage = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState({ status: false });

  const openSubjectForm = () => {
    setIsOpen({ status: true });
  };
  return (
    <Grid container className={classes.content}>
      <CreateSubjectForm isOpen={isOpen} title='Add subject' />
      <Button variant='contained' color='default' className={classes.addBtn} onClick={openSubjectForm}>
        Add Subject
      </Button>
    </Grid>
  );
};

export default TestSubjPage;
