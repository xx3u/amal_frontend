import axios from '../../axiosApi';
import { push } from 'connected-react-router';
import {
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_REQUEST,
  FETCH_PAYMENTS_FAILURE,
  ADD_NEW_PAYMENT_FAILURE,
  ADD_NEW_PAYMENT_REQUEST,
  ADD_NEW_PAYMENT_SUCCESS,
  GET_PAYMENT_BY_ID_REQUEST,
  GET_PAYMENT_BY_ID_SUCCESS,
  GET_PAYMENT_BY_ID_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  GET_PAYMENTS_BY_STUDENT_ID_REQUEST,
  GET_PAYMENTS_BY_STUDENT_ID_SUCCESS,
  GET_PAYMENTS_BY_STUDENT_ID_FAILURE,
} from '../actionTypes';
import { fetchStudents } from './studentsAction';
import { NotificationManager } from 'react-notifications';

const fetchPaymentsRequest = () => ({ type: FETCH_PAYMENTS_REQUEST });

const fetchPaymentsSuccess = (payload) => ({
  type: FETCH_PAYMENTS_SUCCESS,
  payload,
});

const fetchPaymentsFailure = (payload) => ({
  type: FETCH_PAYMENTS_FAILURE,
  payload,
});

export const fetchPayments = () => async (dispatch) => {
  try {
    dispatch(fetchPaymentsRequest());
    const response = await axios.get('/payments');
    dispatch(fetchPaymentsSuccess(response.data));
  } catch (error) {
    dispatch(fetchPaymentsFailure(error));
  }
};

const addNewPaymentRequest = () => ({ type: ADD_NEW_PAYMENT_REQUEST });
const addNewPaymentSuccess = (data) => ({ type: ADD_NEW_PAYMENT_SUCCESS, data });
const addNewPaymentFailure = (error) => ({ type: ADD_NEW_PAYMENT_FAILURE, error });

export const addNewPayment = (newPayment) => async (dispatch) => {
  dispatch(addNewPaymentRequest());
  try {
    const response = await axios.post('/payments', newPayment);
    dispatch(addNewPaymentSuccess(response.data));
    dispatch(fetchStudents());
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(addNewPaymentFailure(error.response));
      NotificationManager.error(error.response.data, 'Ошибка отправки данных!', 5000);
    } else {
      dispatch(addNewPaymentFailure(error));
      NotificationManager.error(error.message, 'Ошибка отправки данных!', 5000);
    }
  }
};

const getPaymentByIdRequest = () => ({ type: GET_PAYMENT_BY_ID_REQUEST });
const getPaymentByIdSuccess = (data) => ({ type: GET_PAYMENT_BY_ID_SUCCESS, data });
const getPaymentByIdFailure = (error) => ({ type: GET_PAYMENT_BY_ID_FAILURE, error });

export const getPaymentById = (id) => async (dispatch) => {
  dispatch(getPaymentByIdRequest());
  try {
    const response = await axios.get(`/payments/${id}`);
    dispatch(getPaymentByIdSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(getPaymentByIdFailure(error.response));
    } else {
      dispatch(getPaymentByIdFailure(error));
    }
  }
};

const updatePaymentRequest = () => ({ type: UPDATE_PAYMENT_REQUEST });
const updatePaymentSuccess = (data) => ({ type: UPDATE_PAYMENT_SUCCESS, data });
const updatePaymentFailure = (error) => ({ type: UPDATE_PAYMENT_FAILURE, error });

export const updatePayment = (id, payment) => async (dispatch) => {
  dispatch(updatePaymentRequest());
  try {
    const response = await axios.put(`/payments/${id}`, payment);
    dispatch(updatePaymentSuccess(response.data));
    dispatch(fetchStudents());
    dispatch(push('/admin-app/payments'));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(updatePaymentFailure(error.response));
      NotificationManager.error(error.response.data, 'Ошибка редактирования!', 5000);
    } else {
      dispatch(updatePaymentFailure(error));
      NotificationManager.error(error.message, 'Ошибка редактирования!', 5000);
    }
  }
};

const getPaymentsByStudentIdRequest = () => ({ type: GET_PAYMENTS_BY_STUDENT_ID_REQUEST });
const getPaymentsByStudentIdSuccess = (data) => ({ type: GET_PAYMENTS_BY_STUDENT_ID_SUCCESS, data });
const getPaymentsByStudentIdFailure = (error) => ({ type: GET_PAYMENTS_BY_STUDENT_ID_FAILURE, error });

export const getPaymentsByStudentId = (id) => async (dispatch) => {
  dispatch(getPaymentsByStudentIdRequest());
  try {
    const response = await axios.get(`/payments?studentId=${id}`);
    dispatch(getPaymentsByStudentIdSuccess(response.data));
  } catch (error) {
    dispatch(getPaymentsByStudentIdFailure(error));
  }
};
