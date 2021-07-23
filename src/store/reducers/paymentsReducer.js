import { FETCH_PAYMENTS_SUCCESS, FETCH_PAYMENTS_FAILURE, ADD_NEW_PAYMENT_FAILURE } from '../actionTypes';
import { ADD_NEW_PAYMENT_REQUEST, ADD_NEW_PAYMENT_SUCCESS } from './../actionTypes';

const initialState = {
  payments: [],
  error: null,
  loading: false,
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
    default:
      return state;
  }
}
