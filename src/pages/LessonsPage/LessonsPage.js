import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LessonsContainer from '../../containers/LessonsContainer/LessonsContainer';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(4),
  },
}));

const LessonsPage = () => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant='h5' paragraph={true} className={classes.title}>
        Расписание по Группам
      </Typography>
      <LessonsContainer />
    </Grid>
  );
};

export default LessonsPage;
