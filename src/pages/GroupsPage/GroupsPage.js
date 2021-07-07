import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    marginTop: 20,
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
    </Grid>
  );
};

export default GroupsPage;
