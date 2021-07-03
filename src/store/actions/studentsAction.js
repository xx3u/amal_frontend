import { push } from 'connected-react-router';
import {
  ADD_NEW_STUDENT_FAILURE,
  ADD_NEW_STUDENT_REQUEST,
  ADD_NEW_STUDENT_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
} from '../actionTypes';
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
    } else {
      dispatch(fetchStudentsFailure(error));
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
    dispatch(addNewStudentFailure(error));
  }
};
