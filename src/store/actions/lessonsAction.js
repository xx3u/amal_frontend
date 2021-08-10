import axios from '../../axiosApi';
import {
  ADD_NEW_LESSON_FAILURE,
  ADD_NEW_LESSON_REQUEST,
  ADD_NEW_LESSON_SUCCESS,
  FETCH_LESSONS_FAILURE,
  FETCH_LESSONS_REQUEST,
  FETCH_LESSONS_SUCCESS,
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
      NotificationManager.error(error.message, 'Fetch error!', 5000);
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
  console.log('lesson: ', lesson);
  return async (dispatch) => {
    try {
      dispatch(addNewLessonRequest());
      await axios.post('/lessons', lesson);
      dispatch(addNewLessonSucces());
    } catch (error) {
      dispatch(addNewLessonFailure(error));
      NotificationManager.error(error.message, 'Post error!', 5000);
    }
  };
};
