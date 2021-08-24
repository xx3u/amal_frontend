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
  GET_TEACHERS_BY_SUBJECT_SUCCESS,
  GET_TEACHERS_BY_SUBJECT_FAILURE,
  GET_TEACHERS_LESSONS_REQUEST,
  GET_TEACHERS_LESSONS_SUCCESS,
  GET_TEACHERS_LESSONS_FAILURE,
  SET_TEACHERS_BY_SUBJECT,
  SET_INIT_TEACHER_LESSONS,
} from '../actionTypes';
import { NotificationManager } from 'react-notifications';
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
      NotificationManager.error(error.message, 'Fetch error!', 5000);
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
      NotificationManager.error(error.message, 'Delete error!', 5000);
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
      NotificationManager.error(error.message, 'Post error!', 5000);
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
      NotificationManager.error(error.message, 'Put error!', 5000);
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
      NotificationManager.error(error.message, 'Fetch error!', 5000);
    }
  };
};

const getTeachersBySubjectSuccess = (teachers) => {
  return { type: GET_TEACHERS_BY_SUBJECT_SUCCESS, teachers };
};

const getTeachersBySubjectFailure = (error) => {
  return { type: GET_TEACHERS_BY_SUBJECT_FAILURE, error };
};

export const getTeachersBySubject = (id) => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`/teachers?subjectId=${id}`);
      dispatch(getTeachersBySubjectSuccess(resp.data));
    } catch (error) {
      dispatch(getTeachersBySubjectFailure(error));
      NotificationManager.error(error.message, 'Fetch error!', 5000);
    }
  };
};
export const setTeachersBySubject = (payload) => {
  return { type: SET_TEACHERS_BY_SUBJECT, payload };
};

const getTeachersLessonsRequest = () => ({ type: GET_TEACHERS_LESSONS_REQUEST });
const getTeachersLessonsSuccess = (data) => ({ type: GET_TEACHERS_LESSONS_SUCCESS, data });
const getTeachersLessonsFailure = (error) => ({ type: GET_TEACHERS_LESSONS_FAILURE, error });

export const getTeachersLessons = (teacherId, startTime, endTime) => {
  return async (dispatch) => {
    try {
      dispatch(getTeachersLessonsRequest());
      const response = await axios.get(`/teachers/${teacherId}/lessons?startTime=${startTime}&endTime=${endTime}`);
      dispatch(getTeachersLessonsSuccess(response.data));
    } catch (error) {
      dispatch(getTeachersLessonsFailure(error));
      NotificationManager.error(error.message, 'Fetch error!', 5000);
    }
  };
};

export const setInitTeacherLesson = () => ({
  type: SET_INIT_TEACHER_LESSONS,
});
