import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: '100%',
    marginTop: '10px',
  },
}));

const UserForm = ({ title, onSubmit, children, buttonId, buttonText, error }) => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {title}
        </Typography>
        {error?.response && (
          <Alert severity='error' className={classes.alert}>
            <AlertTitle>Ошибка</AlertTitle>
            {error.response.data.details
              ? error.response.data.details[0].message
              : error.response.data.error
              ? error.response.data.error
              : error.response.data}
          </Alert>
        )}
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {children}
          </Grid>
          <Button id={buttonId} type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {buttonText}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default UserForm;
