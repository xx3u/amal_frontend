import axios from '../../axiosApi';

import {
  ADD_NEW_LESSON_FAILURE,
  ADD_NEW_LESSON_REQUEST,
  ADD_NEW_LESSON_SUCCESS,
  FETCH_LESSONS_FAILURE,
  FETCH_LESSONS_REQUEST,
  FETCH_LESSONS_SUCCESS,
  DELETE_LESSON_FAILURE,
  DELETE_LESSON_REQUEST,
  DELETE_LESSON_SUCCESS,
  CREATE_LESSONS_REQUEST,
  CREATE_LESSONS_SUCCESS,
  CREATE_LESSONS_FAILURE,
  SET_LESSON_PARAMS,
  SET_INIT_LESSONS,
} from '../actionTypes';
import { NotificationManager } from 'react-notifications';

const fetchLessonsRequest = () => {
  return { type: FETCH_LESSONS_REQUEST };
};

const fetchLessonsSucces = (lessons) => {
  return { type: FETCH_LESSONS_SUCCESS, lessons };
};

const fetchLessonsFailure = (error) => {
  return { type: FETCH_LESSONS_FAILURE, error };
};

export const fetchLessonsByGroupId = (groupId, startTime, endTime) => {
  return async (dispatch) => {
    try {
      dispatch(fetchLessonsRequest());
      const response = await axios.get(`/groups/${groupId}/lessons?startTime=${startTime}&endTime=${endTime}`);
      dispatch(fetchLessonsSucces(response.data));
    } catch (error) {
      dispatch(fetchLessonsFailure(error));
    }
  };
};

const addNewLessonRequest = () => {
  return { type: ADD_NEW_LESSON_REQUEST };
};

const addNewLessonSucces = () => {
  return { type: ADD_NEW_LESSON_SUCCESS };
};

const addNewLessonFailure = (error) => {
  return { type: ADD_NEW_LESSON_FAILURE, error };
};

export const addNewLesson = (lesson) => {
  return async (dispatch) => {
    try {
      dispatch(addNewLessonRequest());
      await axios.post('/lessons', lesson);
      dispatch(addNewLessonSucces());
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(addNewLessonFailure(error.response));
        NotificationManager.error(error.response.data, 'Post error!', 5000);
      } else {
        dispatch(addNewLessonFailure(error));
        NotificationManager.error(error.message, 'Post error!', 5000);
      }
    }
  };
};

const deleteLessonRequest = () => {
  return { type: DELETE_LESSON_REQUEST };
};

const deleteLessonSuccess = (message) => {
  return { type: DELETE_LESSON_SUCCESS, message };
};

const deleteLessonFailure = (error) => {
  return { type: DELETE_LESSON_FAILURE, error };
};

export const deleteLesson = (lessonId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteLessonRequest());
      const resp = await axios.delete(`/lessons/${lessonId}`);
      dispatch(deleteLessonSuccess(resp.data));
    } catch (error) {
      dispatch(deleteLessonFailure(error));
    }
  };
};

const createLessonsRequest = () => ({ type: CREATE_LESSONS_REQUEST });
const createLessonsSuccess = (data) => ({ type: CREATE_LESSONS_SUCCESS, data });
const createLessonsFailure = (error) => ({
  type: CREATE_LESSONS_FAILURE,
  error,
});

export const createLessons = (groupId, createDateRange) => async (dispatch) => {
  try {
    dispatch(createLessonsRequest());
    await axios.post(`/groups/${groupId}/lessons/add`, createDateRange);
    dispatch(createLessonsSuccess());
  } catch (error) {
    dispatch(createLessonsFailure(error));
    NotificationManager.error(error.message, 'Post error!', 5000);
  }
};

export const setLessonsParams = (payload) => {
  return { type: SET_LESSON_PARAMS, payload };
};

export const setInitLessons = () => {
  return { type: SET_INIT_LESSONS };
};
