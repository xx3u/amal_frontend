import axios from '../../axiosApi';
import {
  ADD_NEW_GROUP_FAILURE,
  ADD_NEW_GROUP_REQUEST,
  ADD_NEW_GROUP_SUCCESS,
  CLEAR_UPDATE_TEACHER_ERROR,
  FETCH_GROUPS_FAILURE,
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
  UPDATE_GROUP_FAILURE,
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_SUCCESS,
  UPDATE_TEACHER_IN_LESSONS_FAILURE,
  UPDATE_TEACHER_IN_LESSONS_REQUEST,
  UPDATE_TEACHER_IN_LESSONS_SUCCESS,
} from '../actionTypes';
import { fetchStudents } from './studentsAction';
import { NotificationManager } from 'react-notifications';

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
      dispatch(fetchGroupsFailure(error.response));
    } else {
      dispatch(fetchGroupsFailure(error));
    }
  }
};

const addNewGroupRequest = () => ({ type: ADD_NEW_GROUP_REQUEST });
const addNewGroupSuccess = (data) => ({ type: ADD_NEW_GROUP_SUCCESS, data });
const addNewGroupFailure = (error) => ({ type: ADD_NEW_GROUP_FAILURE, error });

export const addNewGroup = (newGroup, students) => async (dispatch) => {
  dispatch(addNewGroupRequest());
  try {
    const response = await axios.post('/groups', newGroup);
    const groupId = response.data.id;
    if (students.length && groupId) {
      const studentIds = students.map((student) => student.id);
      await axios.put(`/groups/${groupId}/add-students`, { studentIds });
      dispatch(fetchStudents());
      dispatch(fetchGroups());
    }
    dispatch(addNewGroupSuccess(response.data));
    NotificationManager.success('Группа успешно добавлена', 'Успех!');
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(addNewGroupFailure(error.response));
    } else {
      dispatch(addNewGroupFailure(error));
    }
  }
};

const updateGroupRequest = () => ({ type: UPDATE_GROUP_REQUEST });
const updateGroupSuccess = (payload) => ({ type: UPDATE_GROUP_SUCCESS, payload });
const updateGroupFailure = (payload) => ({ type: UPDATE_GROUP_FAILURE, payload });

export const fetchUpdateGroup = (payload) => async (dispatch) => {
  dispatch(updateGroupRequest());
  try {
    const response = await axios.put(`/groups/${payload.id}`, payload.value);
    dispatch(updateGroupSuccess(response.data));
    NotificationManager.success('Группа успешно отредактирована', 'Успех!');
    dispatch(fetchGroups());
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(updateGroupFailure(error.response));
      NotificationManager.error(error.response.data, 'Ошибка редактирования!', 5000);
    } else {
      dispatch(updateGroupFailure(error));
      NotificationManager.error(error.message, 'Ошибка редактирования!', 5000);
    }
  }
};

const updateTeacherInLessonsRequest = () => {
  return { type: UPDATE_TEACHER_IN_LESSONS_REQUEST };
};
const updateTeacherInLessonsSuccess = () => {
  return { type: UPDATE_TEACHER_IN_LESSONS_SUCCESS };
};
const updateTeacherInLessonsFailure = (error) => {
  return { type: UPDATE_TEACHER_IN_LESSONS_FAILURE, error };
};

export const fetchUpdateTeacherInLessons = (groupId, data) => {
  return async (dispatch) => {
    try {
      dispatch(updateTeacherInLessonsRequest());
      await axios.put(`/groups/${groupId}/lessons/edit`, data);
      dispatch(updateTeacherInLessonsSuccess());
      NotificationManager.success('Группа успешно отредактирована', 'Успех!');
    } catch (error) {
      if (error.response) {
        dispatch(updateTeacherInLessonsFailure(error.response.data));
      } else dispatch(updateTeacherInLessonsFailure(error));
    }
  };
};

export const clearUpdateTeacherError = () => {
  return { type: CLEAR_UPDATE_TEACHER_ERROR };
};
