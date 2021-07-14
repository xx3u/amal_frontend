import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  label: {
    marginRight: theme.spacing(2),
    fontWeight: 'bold',
  },
  item: {
    marginBottom: theme.spacing(2),
  },
}));

const StudentDetailItem = ({ info, label }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.item} item>
      <Typography className={classes.label}>{label}</Typography>
      <Typography>{info}</Typography>
    </Grid>
  );
};

export default StudentDetailItem;
