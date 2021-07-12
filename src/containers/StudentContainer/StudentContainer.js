import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { getStudentById } from '../../store/actions/studentsAction';

const useStyles = makeStyles((theme) => ({
  holder: {
    margin: theme.spacing(4),
  },
  label: {
    marginRight: theme.spacing(2),
    fontWeight: 'bold',
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    fontSize: 25,
  },
  item: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const StudentContainer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = props.match.url.split('/')[3];
  const studentById = useSelector((state) => state.students.student);

  useEffect(() => {
    dispatch(getStudentById(id));
  }, [id]);

  return (
    <Grid container className={classes.holder} direction='column' justify='space-between'>
      <Grid item>
        <Typography className={classes.title}>Информация об ученике</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Имя: </Typography>
        <Typography>{studentById.firstName}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Фамилия: </Typography>
        <Typography>{studentById.lastName}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Отчество: </Typography>
        <Typography>{studentById.middleName}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Класс: </Typography>
        <Typography>{studentById.grade}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Язык: </Typography>
        <Typography>{studentById.language}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Школа: </Typography>
        <Typography>{studentById.school}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Контакты родителя(ей): </Typography>
        <Typography>{studentById.parentsContacts}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Поток: </Typography>
        <Typography>{studentById.stream}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Адрес: </Typography>
        <Typography>{studentById.address}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Телефон: </Typography>
        <Typography>{studentById.telephone}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Email: </Typography>
        <Typography>{studentById.email}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Typography className={classes.label}>Статус: </Typography>
        <Typography>{studentById.status}</Typography>
      </Grid>
      <Grid container className={classes.item} item>
        <Button variant='contained' component={Link} to='/admin-app/students' color='default'>
          К списку учащихся
        </Button>
        <Button className={classes.button} variant='contained' component={Link} to={`/admin-app/students/edit/${id}`} color='default'>
          Изменить информацию
        </Button>
      </Grid>
    </Grid>
  );
};

export default StudentContainer;
