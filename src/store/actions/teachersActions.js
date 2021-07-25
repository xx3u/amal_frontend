import axios from '../../axiosApi';
import { FETCH_TEACHERS_FAILURE, FETCH_TEACHERS_REQUEST, FETCH_TEACHERS_SUCCESS } from '../actionTypes';

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
