import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LessonsContainer from '../../containers/LessonsContainer/LessonsContainer';

const useStyles = makeStyles(() => ({
  title: {
    margin: 20,
    marginLeft: 150,
    fontWeight: 'bold',
  },
}));

const LessonsPage = () => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant='h5' className={classes.title}>
        Групповые занятия
      </Typography>
      <LessonsContainer />
    </Grid>
  );
};

export default LessonsPage;
