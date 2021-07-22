import { FETCH_PAYMENTS_SUCCESS, FETCH_PAYMENTS_FAILURE } from '../actionTypes';

const initialState = {
  payments: [],
  error: null,
};

export default function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PAYMENTS_SUCCESS:
      return { ...state, payments: action.payload, error: null };
    case FETCH_PAYMENTS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
