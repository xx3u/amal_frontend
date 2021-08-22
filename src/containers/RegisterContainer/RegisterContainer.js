import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import FormItem from '../../components/UI/Form/FormItem/FormItem';
import UserForm from '../../components/UserForm/UserForm';
import { createUser } from '../../store/actions/usersActions';

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.registerError);

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
    await dispatch(createUser({ ...state }));
  };

  return (
    <UserForm
      onSubmit={submitFormHandler}
      title='Регистрация'
      buttonText='Зарегистрироваться'
      link='/login'
      linkText='У Вас есть аккаунт? Войти'
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

export default Register;
