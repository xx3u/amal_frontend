import {
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  ADD_NEW_PAYMENT_REQUEST,
  ADD_NEW_PAYMENT_SUCCESS,
  ADD_NEW_PAYMENT_FAILURE,
  GET_PAYMENT_BY_ID_REQUEST,
  GET_PAYMENT_BY_ID_SUCCESS,
  GET_PAYMENT_BY_ID_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  GET_PAYMENTS_BY_STUDENT_ID_REQUEST,
  GET_PAYMENTS_BY_STUDENT_ID_SUCCESS,
  GET_PAYMENTS_BY_STUDENT_ID_FAILURE,
} from './../actionTypes';

const initialState = {
  payments: [],
  error: null,
  loading: false,
  payment: {},
  paymentsByStudent: [],
};

export default function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PAYMENTS_SUCCESS:
      return { ...state, payments: action.payload, error: null };
    case FETCH_PAYMENTS_FAILURE:
      return { ...state, error: action.payload };
    case ADD_NEW_PAYMENT_REQUEST:
      return { ...state, loading: true };
    case ADD_NEW_PAYMENT_SUCCESS:
      return { ...state, loading: false };
    case ADD_NEW_PAYMENT_FAILURE:
      return { ...state, loading: false, error: action.data };
    case GET_PAYMENT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_PAYMENT_BY_ID_SUCCESS:
      return { ...state, payment: action.data, loading: false };
    case GET_PAYMENT_BY_ID_FAILURE:
      return { ...state, error: action.error, loading: false };
    case UPDATE_PAYMENT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PAYMENT_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_PAYMENT_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_PAYMENTS_BY_STUDENT_ID_REQUEST:
      return { ...state, loading: true };
    case GET_PAYMENTS_BY_STUDENT_ID_SUCCESS:
      return { ...state, paymentsByStudent: action.data, loading: false };
    case GET_PAYMENTS_BY_STUDENT_ID_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
}
