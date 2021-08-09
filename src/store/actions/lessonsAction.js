import axios from '../../axiosApi';

import { DELETE_LESSON_FAILURE, DELETE_LESSON_REQUEST, DELETE_LESSON_SUCCESS } from '../actionTypes';

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
