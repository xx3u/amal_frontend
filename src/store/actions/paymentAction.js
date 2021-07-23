import axios from '../../axiosApi';
import {
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_REQUEST,
  FETCH_PAYMENTS_FAILURE,
  ADD_NEW_STUDENT_FAILURE,
  ADD_NEW_PAYMENT_REQUEST,
  ADD_NEW_PAYMENT_SUCCESS,
  GET_PAYMENT_BY_ID_REQUEST,
  GET_PAYMENT_BY_ID_SUCCESS,
  GET_PAYMENT_BY_ID_FAILURE,
} from '../actionTypes';

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
const addNewPaymentFailure = (error) => ({ type: ADD_NEW_STUDENT_FAILURE, error });

export const addNewPayment = (newPayment) => async (dispatch) => {
  dispatch(addNewPaymentRequest());
  try {
    const response = await axios.post('/payments', newPayment);
    dispatch(addNewPaymentSuccess(response.data));
    dispatch(fetchPayments());
  } catch (error) {
    dispatch(addNewPaymentFailure(error));
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
    dispatch(getPaymentByIdFailure(error));
  }
};
