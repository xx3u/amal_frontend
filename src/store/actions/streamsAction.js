import { FETCH_STREAMS_REQUEST, FETCH_STREAMS_SUCCESS, FETCH_STREAMS_FAILURE } from '../actionTypes';
import axios from '../../axiosApi';
import { NotificationManager } from 'react-notifications';

const fetchStreamsRequest = () => ({
  type: FETCH_STREAMS_REQUEST,
});

const fetchStreamsSuccess = (payload) => ({
  type: FETCH_STREAMS_SUCCESS,
  payload,
});

const fetchStreamsFailure = (payload) => ({
  type: FETCH_STREAMS_FAILURE,
  payload,
});

export const fetchStreams = () => async (dispatch) => {
  dispatch(fetchStreamsRequest());
  try {
    const response = await axios('/streams');
    dispatch(fetchStreamsSuccess(response.data));
  } catch (error) {
    dispatch(fetchStreamsFailure(error));
  }
};
