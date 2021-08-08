import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const ErrorAlert = ({ error, message }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  if (error !== null) {
    setOpen(true);
  } else {
    setOpen(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity='error'> {message} </Alert>
      </Snackbar>
    </div>
  );
};
export default ErrorAlert;
