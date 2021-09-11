import axios from '../../axiosApi';
import {
  ADD_NEW_SUBJECT_FAILURE,
  ADD_NEW_SUBJECT_REQUEST,
  ADD_NEW_SUBJECT_SUCCESS,
  FETCH_SUBJECTS_FAILURE,
  FETCH_SUBJECTS_REQUEST,
  FETCH_SUBJECTS_SUCCESS,
  UPDATE_SUBJECT_FAILURE,
  UPDATE_SUBJECT_REQUEST,
  UPDATE_SUBJECT_SUCCESS,
} from '../actionTypes';
import { NotificationManager } from 'react-notifications';
export const fetchSubjectsSuccess = (subjects) => ({
  type: FETCH_SUBJECTS_SUCCESS,
  subjects,
});

export const fetchSubjectsFailure = (error) => ({
  type: FETCH_SUBJECTS_FAILURE,
  error,
});

export const fetchSubjectsRequest = () => ({ type: FETCH_SUBJECTS_REQUEST });

export const fetchSubjects = () => async (dispatch) => {
  try {
    dispatch(fetchSubjectsRequest());
    const response = await axios.get('/subjects');
    dispatch(fetchSubjectsSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(fetchSubjectsFailure(error.response.data));
    } else {
      dispatch(fetchSubjectsFailure(error));
    }
  }
};

const addNewSubjectRequest = () => ({ type: ADD_NEW_SUBJECT_REQUEST });
const addNewSubjectSuccess = (data) => ({ type: ADD_NEW_SUBJECT_SUCCESS, data });
const addNewSubjectFailure = (error) => ({ type: ADD_NEW_SUBJECT_FAILURE, error });

export const addNewSubject = (newSubj) => async (dispatch) => {
  dispatch(addNewSubjectRequest());
  try {
    await axios.post('/subjects', newSubj).then((response) => dispatch(addNewSubjectSuccess(response.data)));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(addNewSubjectFailure(error.response));
      NotificationManager.error(error.response.data, 'Ошибка отправки данных!', 5000);
    } else {
      dispatch(addNewSubjectFailure(error));
      NotificationManager.error(error.message, 'Ошибка отправки данных!', 5000);
    }
  }
};

const updateSubjectRequest = () => ({ type: UPDATE_SUBJECT_REQUEST });
const updateSubjectSuccess = (payload) => ({ type: UPDATE_SUBJECT_SUCCESS, payload });
const updateSubjectFailure = (payload) => ({ type: UPDATE_SUBJECT_FAILURE, payload });

export const fetchUpdateSubject = (payload) => async (dispatch) => {
  dispatch(updateSubjectRequest());
  try {
    const response = await axios.put(`/subjects/${payload.id}`, payload.value);
    dispatch(updateSubjectSuccess(response.data));
    dispatch(fetchSubjects());
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(updateSubjectFailure(error.response));
      NotificationManager.error(error.response.data, 'Ошибка редактирования!', 5000);
    } else {
      dispatch(updateSubjectFailure(error));
      NotificationManager.error(error.message, 'Ошибка редактирования!', 5000);
    }
  }
};
