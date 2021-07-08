import axios from '../../axiosApi';
import { FETCH_GROUPS_FAILURE, FETCH_GROUPS_REQUEST, FETCH_GROUPS_SUCCESS } from '../actionTypes';

export const fetchGroupsSuccess = (groups) => ({
  type: FETCH_GROUPS_SUCCESS,
  groups,
});

export const fetchGroupsFailure = (error) => ({
  type: FETCH_GROUPS_FAILURE,
  error,
});

export const fetchGroupsRequest = () => ({ type: FETCH_GROUPS_REQUEST });

export const fetchGroups = () => async (dispatch) => {
  try {
    dispatch(fetchGroupsRequest());
    const response = await axios.get('/groups');
    dispatch(fetchGroupsSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(fetchGroupsFailure(error.response.data));
    } else {
      dispatch(fetchGroupsFailure(error));
    }
  }
};
