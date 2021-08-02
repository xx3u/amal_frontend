import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import LessonsContainer from '../../containers/LessonsContainer/LessonsContainer';

const LessonsPage = () => {
  return (
    <Grid>
      <Typography variant='h5'>Групповые занятия</Typography>
      <LessonsContainer />
    </Grid>
  );
};

export default LessonsPage;
