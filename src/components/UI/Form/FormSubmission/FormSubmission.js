import { Container, makeStyles, Typography, Grid, Button } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    float: 'right',
  },
  flex: {
    display: 'flex',
  },
}));

const FormSubmission = ({ maxWidth, title, onSubmit, children }) => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth={maxWidth}>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          {title}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2} className={classes.flex}>
            {children}
          </Grid>
          <Button type='submit' variant='contained' color='primary' className={classes.submit}>
            {title}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default FormSubmission;
