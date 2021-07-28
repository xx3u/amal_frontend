import React from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import PaymentsByStudentId from '../../containers/PaymentsByStudentId/PaymentsByStudentId';

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: theme.spacing(2),
  },
  holder: {
    marginTop: 20,
  },
}));

const PaymentsByStudent = () => {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <Grid container className={classes.holder}>
      <PaymentsByStudentId id={id} />
      <Grid container className={classes.item} item>
        <Button variant='contained' component={Link} to='/admin-app/payments' color='default'>
          Вернуться к платежам
        </Button>
      </Grid>
    </Grid>
  );
};

export default PaymentsByStudent;
