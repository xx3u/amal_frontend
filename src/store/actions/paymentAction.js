import { FETCH_PAYMENTS_SUCCESS, FETCH_PAYMENTS_REQUEST, FETCH_PAYMENTS_FAILURE } from '../actionTypes';

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
