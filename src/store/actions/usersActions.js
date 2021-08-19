import axios from '../../axiosApi';
import { push } from 'connected-react-router';
import {
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
} from '../actionTypes';

const createUserSuccess = () => {
  return { type: CREATE_USER_SUCCESS };
};
const createUserFailure = (error) => {
  return { type: CREATE_USER_FAILURE, error };
};

export const createUser = (userData) => {
  return async (dispatch) => {
    try {
      await axios.post('/users/register', userData);
      dispatch(createUserSuccess());
      dispatch(push('/'));
    } catch (error) {
      dispatch(createUserFailure(error));
    }
  };
};

const loginUserSuccess = (user) => {
  return { type: LOGIN_USER_SUCCESS, user };
};
const loginUserFailure = (error) => {
  return { type: LOGIN_USER_FAILURE, error };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/users/login', userData);
      dispatch(loginUserSuccess(response.data));
      dispatch(push('/'));
    } catch (error) {
      dispatch(loginUserFailure(error));
    }
  };
};

const logoutUserSuccess = () => {
  return { type: LOGOUT_USER_SUCCESS };
};
const logoutUserFailure = (error) => {
  return { type: LOGOUT_USER_FAILURE, error };
};

export const logoutUser = () => {
  return (dispatch) => {
    try {
      dispatch(logoutUserSuccess());
      dispatch(push('/login'));
    } catch (error) {
      dispatch(logoutUserFailure(error));
    }
  };
};
