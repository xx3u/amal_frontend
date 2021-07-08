import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GroupsContainer from '../../containers/GroupsContainer/GroupsContainer';
import GroupForm from '../../containers/Forms/Group/GroupForm';

const useStyles = makeStyles(() => ({
  title: {
    margin: 20,
    fontWeight: 'bold',
  },
}));

const GroupsPage = () => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant='h5' className={classes.title}>
        Группы
      </Typography>
      <GroupForm />
      <GroupsContainer />
    </Grid>
  );
};

export default GroupsPage;
