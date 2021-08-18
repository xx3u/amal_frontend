import {
  ADD_NEW_GROUP_FAILURE,
  ADD_NEW_GROUP_REQUEST,
  ADD_NEW_GROUP_SUCCESS,
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

const initialState = {
  groups: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS_REQUEST:
      return { ...state, loading: true };
    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.groups,
        error: null,
        loading: false,
      };
    case FETCH_GROUPS_FAILURE:
      return { ...state, error: action.error, loading: false };
    case ADD_NEW_GROUP_REQUEST:
      return { ...state, loading: true };
    case ADD_NEW_GROUP_SUCCESS: {
      const updatedGroups = [...state.groups];
      updatedGroups.push(action.data);
      return { ...state, groups: updatedGroups, loading: false };
    }
    case ADD_NEW_GROUP_FAILURE:
      return { ...state, error: action.error, loading: false };

    case UPDATE_GROUP_REQUEST:
      return { ...state, loading: true };
    case UPDATE_GROUP_SUCCESS:
      return { ...state, loading: false, error: null };
    case UPDATE_GROUP_FAILURE:
      return { ...state, error: action.error, loading: false };
    case UPDATE_TEACHER_IN_LESSONS_REQUEST:
      return { ...state, loading: true };
    case UPDATE_TEACHER_IN_LESSONS_SUCCESS:
      return { ...state, loading: false, error: null };
    case UPDATE_TEACHER_IN_LESSONS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default reducer;
