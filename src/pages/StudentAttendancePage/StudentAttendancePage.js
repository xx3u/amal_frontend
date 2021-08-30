import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StudentAttendanceContainer from '../../containers/StudentAttendanceContainer/StudentAttendanceContainer';

const useStyles = makeStyles(() => ({
  title: {
    margin: 20,
  },
}));

const StudentAttendancePage = () => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant='h5' paragraph={true} className={classes.title}>
        Журнал посещений
      </Typography>
      <StudentAttendanceContainer />
    </Grid>
  );
};

export default StudentAttendancePage;
