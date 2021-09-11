import {
  FETCH_STREAMS_REQUEST,
  FETCH_STREAMS_SUCCESS,
  FETCH_STREAMS_FAILURE,
  ADD_NEW_STREAM_FAILURE,
  ADD_NEW_STREAM_SUCCESS,
  ADD_NEW_STREAM_REQUEST,
} from '../actionTypes';
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

const addNewStreamRequest = () => ({ type: ADD_NEW_STREAM_REQUEST });
const addNewStreamSuccess = (data) => ({ type: ADD_NEW_STREAM_SUCCESS, data });
const addNewStreamFailure = (error) => ({ type: ADD_NEW_STREAM_FAILURE, error });

export const addNewStream = (newStr) => async (dispatch) => {
  dispatch(addNewStreamRequest());
  try {
    await axios.post('/streams', newStr).then((response) => dispatch(addNewStreamSuccess(response.data)));
    NotificationManager.success('Направление успешно добавлено', 'Успех!');
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(addNewStreamFailure(error.response));
      NotificationManager.error(error.response.data, 'Ошибка отправки данных!', 5000);
    } else {
      dispatch(addNewStreamFailure(error));
      NotificationManager.error(error.message, 'Ошибка отправки данных!', 5000);
    }
  }
};
