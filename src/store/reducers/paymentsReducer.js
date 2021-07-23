import {
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  ADD_NEW_PAYMENT_REQUEST,
  ADD_NEW_PAYMENT_SUCCESS,
  ADD_NEW_PAYMENT_FAILURE,
  GET_PAYMENT_BY_ID_REQUEST,
  GET_PAYMENT_BY_ID_SUCCESS,
  GET_PAYMENT_BY_ID_FAILURE,
} from './../actionTypes';

const initialState = {
  payments: [],
  error: null,
  loading: false,
  payment: {},
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
    default:
      return state;
  }
}
