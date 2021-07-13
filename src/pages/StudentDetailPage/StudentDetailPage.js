import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import StudentDetailContainer from '../../containers/StudentDetailContainer/StudentDetailContainer';
const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    fontSize: 25,
  },
  item: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  holder: {
    margin: theme.spacing(4),
  },
}));

const StudentDetailPage = (props) => {
  const classes = useStyles();
  const id = props.match.url.split('/')[3];
  return (
    <Grid container className={classes.holder}>
      <Grid item>
        <Typography className={classes.title}>Информация об ученике</Typography>
      </Grid>
      <StudentDetailContainer id={id} />
      <Grid container className={classes.item} item>
        <Button variant='contained' component={Link} to='/admin-app/students' color='default'>
          К списку учащихся
        </Button>
        <Button
          className={classes.button}
          variant='contained'
          component={Link}
          to={`/admin-app/students/${id}/edit`}
          color='default'
        >
          Изменить информацию
        </Button>
      </Grid>
    </Grid>
  );
};

export default StudentDetailPage;
