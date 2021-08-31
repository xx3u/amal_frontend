import { push } from 'connected-react-router';
import {
  ADD_NEW_STUDENT_FAILURE,
  ADD_NEW_STUDENT_REQUEST,
  ADD_NEW_STUDENT_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  GET_STUDENT_BY_ID_FAILURE,
  GET_STUDENT_BY_ID_REQUEST,
  GET_STUDENT_BY_ID_SUCCESS,
  UPDATE_STUDENT_FAILURE,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
} from '../actionTypes';
import { NotificationManager } from 'react-notifications';
import axios from '../../axiosApi';

export const fetchStudentsSuccess = (students) => ({
  type: FETCH_STUDENTS_SUCCESS,
  students,
});

export const fetchStudentsFailure = (error) => ({
  type: FETCH_STUDENTS_FAILURE,
  error,
});

export const fetchStudentsRequest = () => ({ type: FETCH_STUDENTS_REQUEST });

export const fetchStudents = () => async (dispatch) => {
  try {
    dispatch(fetchStudentsRequest());
    const response = await axios.get('/students');
    dispatch(fetchStudentsSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(fetchStudentsFailure(error.response.data));
      NotificationManager.error(error.response.data.message, 'Fetch error!', 5000);
    } else {
      dispatch(fetchStudentsFailure(error));
      NotificationManager.error(error.message, 'Fetch error!', 5000);
    }
  }
};

export const getStudentsByParams = (firstName, lastName) => async (dispatch) => {
  try {
    dispatch(fetchStudentsRequest());
    const response = await axios.get(`/students/?firstName=${firstName}&lastName=${lastName}`);
    dispatch(fetchStudentsSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(fetchStudentsFailure(error.response.data));
      NotificationManager.error(error.response.data.message, 'Fetch error!', 5000);
    } else {
      dispatch(fetchStudentsFailure(error));
      NotificationManager.error(error.response.data.message, 'Fetch error!', 5000);
    }
  }
};

const addNewStudentRequest = () => ({ type: ADD_NEW_STUDENT_REQUEST });
const addNewStudentSuccess = (data) => ({ type: ADD_NEW_STUDENT_SUCCESS, data });
const addNewStudentFailure = (error) => ({ type: ADD_NEW_STUDENT_FAILURE, error });

export const addNewStudent = (newStudent) => async (dispatch) => {
  dispatch(addNewStudentRequest());
  try {
    await axios.post('/students', newStudent).then((response) => dispatch(addNewStudentSuccess(response.data)));
    dispatch(push('/admin-app/students'));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(addNewStudentFailure(error.response));
    } else {
      dispatch(addNewStudentFailure(error));
    }
  }
};

const getStudentbyIdRequest = () => ({ type: GET_STUDENT_BY_ID_REQUEST });
const getStudentByIdSuccess = (student) => ({ type: GET_STUDENT_BY_ID_SUCCESS, student });
const getStudentByIdFailure = (error) => ({ type: GET_STUDENT_BY_ID_FAILURE, error });

export const getStudentById = (id) => async (dispatch) => {
  dispatch(getStudentbyIdRequest());
  try {
    await axios.get(`/students/${id}`).then((response) => dispatch(getStudentByIdSuccess(response.data)));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(getStudentByIdFailure(error.response.data));
      NotificationManager.error(error.response.data.error, 'Fetch error!', 5000);
    } else {
      dispatch(getStudentByIdFailure(error));
      NotificationManager.error(error.message, 'Fetch error!', 5000);
    }
  }
};

const updateStudentRequest = () => ({ type: UPDATE_STUDENT_REQUEST });
const updateStudentSuccess = (data) => ({ type: UPDATE_STUDENT_SUCCESS, data });
const updateStudentFailure = (error) => ({ type: UPDATE_STUDENT_FAILURE, error });

export const updateStudent = (id, updatedStudent) => async (dispatch) => {
  dispatch(updateStudentRequest());
  try {
    await axios
      .put(`/students/${id}`, updatedStudent)
      .then((response) => dispatch(updateStudentSuccess(response.data)));
    dispatch(push('/admin-app/students'));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(updateStudentFailure(error));
    } else {
      dispatch(updateStudentFailure(error));
    }
  }
};
