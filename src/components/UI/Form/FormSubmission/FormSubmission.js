import { Container, makeStyles, Typography, Grid, Button } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const FormSubmission = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth={props.maxWidth}>
      <Typography component="h1" variant="h5">
        {props.title}
      </Typography>
      <form className={classes.form} onSubmit={props.onSubmit}>
        <Grid container spacing={2}>
          {props.children}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {props.title}
        </Button>
      </form>
    </Container>
  )
};

export default FormSubmission;