import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginBottom: theme.spacing(4),
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: theme.spacing(4),
  },
}));

const ActionsArea = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.actions}>{children}</div>;
};

export default ActionsArea;
