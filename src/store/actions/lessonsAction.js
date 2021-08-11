import axios from '../../axiosApi';
import {
  ADD_NEW_LESSON_FAILURE,
  ADD_NEW_LESSON_REQUEST,
  ADD_NEW_LESSON_SUCCESS,
  FETCH_LESSONS_FAILURE,
  FETCH_LESSONS_REQUEST,
  FETCH_LESSONS_SUCCESS,
} from '../actionTypes';

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
      dispatch(addNewLessonFailure(error));
    }
  };
};