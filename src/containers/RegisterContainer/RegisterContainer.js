import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormItem from '../../components/UI/Form/FormItem/FormItem';
import UserForm from '../../components/UserForm/UserForm';
import { createUser } from '../../store/actions/usersActions';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, TextField } from '@material-ui/core';
import { useEffect } from 'react';
import { fetchTeachers } from '../../store/actions/teachersActions';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 420,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  autoComplete: {
    marginBottom: theme.spacing(3),
    minWidth: 412,
  },
  formItem: {
    marginBottom: theme.spacing(3),
  },
}));

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.registerError);

  const [state, setState] = useState({
    username: '',
    password: '',
    role: '',
    teacherId: '',
  });

  const [checked, setChecked] = React.useState(false);

  const teachers = useSelector((state) => state.teachers.teachers);
  const roles = [
    { id: 1, sendingValue: 'admin', showingValue: 'Админ' },
    { id: 2, sendingValue: 'teacher', showingValue: 'Учитель' },
    { id: 3, sendingValue: 'student', showingValue: 'Ученик' },
  ];

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    await dispatch(createUser({ ...state }));
  };

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  console.log('state', state);

  useEffect(() => {
    state.role && state.role === 'teacher' ? setChecked(true) : setChecked(false);
  }, [state.role]);

  return (
    <UserForm
      onSubmit={submitFormHandler}
      title='Регистрация'
      buttonText='Зарегистрироваться'
      link='/login'
      linkText='У Вас есть аккаунт? Войти'
      error={error}
    >
      <Grid container display='flex' justifyContent='center' alignItems='center' align='center' bgcolor='success.main'>
        <Grid item xs={12} className={classes.formItem}>
          <FormItem name='username' value={state.username} onChange={inputChangeHandler} label='Username' type='text' />
        </Grid>
        <Grid item xs={12} className={classes.formItem}>
          <FormItem
            name='password'
            value={state.password}
            onChange={inputChangeHandler}
            label='Password'
            type='password'
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id='roles'
            className={classes.autoComplete}
            options={roles}
            getOptionLabel={(option) => option.showingValue}
            getOptionSelected={(option, value) => option.id === value.id}
            onChange={(event, value) => setState((state) => ({ ...state, role: value?.sendingValue }))}
            noOptionsText={'список пуст'}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label='Роль' variant='outlined' placeholder='Выберите' />}
          />
        </Grid>
        <Fade in={checked}>
          <Grid item>
            <Autocomplete
              id='teachers'
              className={classes.autoComplete}
              options={teachers}
              getOptionLabel={(option) => `${option.firstName} ${option.lastName}` || ''}
              onChange={(event, value) => setState((state) => ({ ...state, teacherId: value?.id }))}
              noOptionsText={'список пуст'}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label='Учитель' variant='outlined' placeholder='Выберите' />
              )}
            />
          </Grid>
        </Fade>
      </Grid>
    </UserForm>
  );
};

export default Register;
