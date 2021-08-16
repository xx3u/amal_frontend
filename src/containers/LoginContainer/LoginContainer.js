import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/usersActions';
import FormItem from '../../components/UI/Form/FormItem/FormItem';
import UserForm from '../../components/UserForm/UserForm';

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.loginError);

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ ...state }));
  };

  console.log('error', error);
  return (
    <UserForm
      onSubmit={submitFormHandler}
      title='Войти'
      button='Войти'
      buttonText='Войти'
      link='/register'
      linkText='Нет учетной записи? Зарегистрироваться'
      error={error}
    >
      <Grid item xs={12}>
        <FormItem name='username' value={state.username} onChange={inputChangeHandler} label='Username' type='text' />
      </Grid>
      <Grid item xs={12}>
        <FormItem
          name='password'
          value={state.password}
          onChange={inputChangeHandler}
          label='Password'
          type='password'
        />
      </Grid>
    </UserForm>
  );
};

export default Login;
