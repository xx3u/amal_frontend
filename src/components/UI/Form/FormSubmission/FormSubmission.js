import { Container, makeStyles, Typography, Grid, Button } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0),
  },
}));

const FormSubmission = ({ maxWidth, title, onSubmit, children }) => {
  const classes = useStyles();

  return (
    <Container maxWidth={maxWidth}>
      <Grid container justifyContent='center' className={classes.paper}>
        <Typography component='h1' variant='h5'>
          {title}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            {children}
          </Grid>
          <Grid container item justifyContent='flex-end'>
            <Button type='submit' variant='contained' color='primary' className={classes.button}>
              {title}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default FormSubmission;
