import axios from '../../axiosApi';
import { push } from 'connected-react-router';
import {
  FETCH_TEACHERS_FAILURE,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  DELETE_TEACHER_FAILURE,
  DELETE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
  ADD_NEW_TEACHER_REQUEST,
  ADD_NEW_TEACHER_SUCCESS,
  ADD_NEW_TEACHER_FAILURE,
  UPDATE_TEACHER_REQUEST,
  UPDATE_TEACHER_SUCCESS,
  UPDATE_TEACHER_FAILURE,
  GET_TEACHER_BY_ID_REQUEST,
  GET_TEACHER_BY_ID_SUCCESS,
  GET_TEACHER_BY_ID_FAILURE,
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
      dispatch(fetchTeachers());
    } catch (error) {
      dispatch(deleteTeacherFailure(error));
    }
  };
};

const addTeacherRequest = () => {
  return { type: ADD_NEW_TEACHER_REQUEST };
};

const addTeacherSucces = (teacher) => {
  return { type: ADD_NEW_TEACHER_SUCCESS, teacher };
};

const addTeacherFailure = (error) => {
  return { type: ADD_NEW_TEACHER_FAILURE, error };
};

export const addTeacher = (teacher) => {
  return async (dispatch) => {
    try {
      dispatch(addTeacherRequest());
      const response = await axios.post('/teachers', teacher);
      dispatch(addTeacherSucces(response.data));
      dispatch(push('/admin-app/teachers'));
    } catch (error) {
      dispatch(addTeacherFailure(error));
    }
  };
};

const editTeacherRequest = () => {
  return { type: UPDATE_TEACHER_REQUEST };
};

const editTeacherSuccess = () => {
  return { type: UPDATE_TEACHER_SUCCESS };
};

const editTeacherFailure = (error) => {
  return { type: UPDATE_TEACHER_FAILURE, error };
};

export const editTeacher = (teacher, id) => {
  return async (dispatch) => {
    try {
      dispatch(editTeacherRequest());
      await axios.put(`/teachers/${id}`, teacher);
      dispatch(editTeacherSuccess());
      dispatch(push('/admin-app/teachers'));
    } catch (error) {
      dispatch(editTeacherFailure(error));
    }
  };
};

const getTeacherByIdRequest = () => {
  return { type: GET_TEACHER_BY_ID_REQUEST };
};

const getTeacherByIdSuccess = (teacher) => {
  return { type: GET_TEACHER_BY_ID_SUCCESS, teacher };
};

const getTeacherByIdFailure = (error) => {
  return { type: GET_TEACHER_BY_ID_FAILURE, error };
};

export const getTeacherById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getTeacherByIdRequest());
      const resp = await axios.get('/teachers/' + id);
      dispatch(getTeacherByIdSuccess(resp.data));
    } catch (error) {
      dispatch(getTeacherByIdFailure(error));
    }
  };
};
