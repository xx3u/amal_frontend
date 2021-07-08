import {
  ADD_NEW_GROUP_FAILURE,
  ADD_NEW_GROUP_REQUEST,
  ADD_NEW_GROUP_SUCCESS,
  FETCH_GROUPS_FAILURE,
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
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
    default:
      return state;
  }
};

export default reducer;
