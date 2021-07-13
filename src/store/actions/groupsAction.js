import axios from '../../axiosApi';
import {
  ADD_NEW_GROUP_FAILURE,
  ADD_NEW_GROUP_REQUEST,
  ADD_NEW_GROUP_SUCCESS,
  FETCH_GROUPS_FAILURE,
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
} from '../actionTypes';

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

const addNewGroupRequest = () => ({ type: ADD_NEW_GROUP_REQUEST });
const addNewGroupSuccess = (data) => ({ type: ADD_NEW_GROUP_SUCCESS, data });
const addNewGroupFailure = (error) => ({ type: ADD_NEW_GROUP_FAILURE, error });
const addStudentsInGroup = async (groupId, students) => {
  if (students.length && groupId) {
    const studentIds = students.map((student) => student.id);
    await axios.put(`/groups/${groupId}/add-students`, { studentIds });
  }
};
export const addNewGroup = (newGroup, students) => async (dispatch) => {
  dispatch(addNewGroupRequest());
  try {
    const response = await axios.post('/groups', newGroup);
    const groupId = response.data.id;
    addStudentsInGroup(groupId, students);
    dispatch(addNewGroupSuccess(response.data));
    dispatch(push('/admin-app/groups'));
  } catch (error) {
    dispatch(addNewGroupFailure(error));
  }
};
