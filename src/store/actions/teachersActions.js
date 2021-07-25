import axios from '../../axiosApi';
import {
  FETCH_TEACHERS_FAILURE,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  DELETE_TEACHER_FAILURE,
  DELETE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
} from '../actionTypes';

const fetchTeachersRequest = () => {
  return { type: FETCH_TEACHERS_REQUEST };
};

const fetchTeachersFailure = (error) => {
  return { type: FETCH_TEACHERS_FAILURE, error };
};

const fetchTeachersSuccess = (teachers) => {
  return { type: FETCH_TEACHERS_SUCCESS, teachers };
};

export const fetchTeachers = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchTeachersRequest());
      const response = await axios.get('/teachers');
      dispatch(fetchTeachersSuccess(response.data));
    } catch (error) {
      dispatch(fetchTeachersFailure(error));
    }
  };
};

const deleteTeacherRequest = () => {
  return { type: DELETE_TEACHER_REQUEST };
};

const deleteTeacherSuccess = (message) => {
  return { type: DELETE_TEACHER_SUCCESS, message };
};

const deleteTeacherFailure = (error) => {
  return { type: DELETE_TEACHER_FAILURE, error };
};

export const deleteTeacher = (teacherId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteTeacherRequest());
      const resp = await axios.delete(`/teachers/${teacherId}`);
      dispatch(deleteTeacherSuccess(resp.data));
    } catch (error) {
      dispatch(deleteTeacherFailure(error));
    }
  };
};
