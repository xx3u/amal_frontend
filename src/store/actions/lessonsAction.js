import axios from '../../axiosApi';
import { FETCH_LESSONS_FAILURE, FETCH_LESSONS_REQUEST, FETCH_LESSONS_SUCCESS } from '../actionTypes';

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
      const response = await axios.get(`/lessons?groupId=${groupId}&startTime=${startTime}&endTime=${endTime}`);
      dispatch(fetchLessonsSucces(response.data));
    } catch (error) {
      dispatch(fetchLessonsFailure(error));
    }
  };
};
