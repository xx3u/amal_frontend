import axios from '../../axiosApi';
import { CREATE_LESSONS_REQUEST, CREATE_LESSONS_SUCCESS, CREATE_LESSONS_FAILURE } from './../actionTypes';

const createLessonsRequest = () => ({ type: CREATE_LESSONS_REQUEST});
const createLessonsSuccess = (data) => ({ type: CREATE_LESSONS_SUCCESS, data });
const createLessonsFailure = (error) => ({ type: CREATE_LESSONS_FAILURE, error });

export const createLessons = (groupId, createDateRange) => async (dispatch) => {
  try {
    dispatch(createLessonsRequest());
    console.log('createDateRange', createDateRange);
    const response = axios.post(`/groups/${groupId}/lessons/add`, createDateRange);
    console.log('response', response.data);
    dispatch(createLessonsSuccess());
  } catch (error) {
    dispatch(createLessonsFailure(error));
  }
};
