import { FETCH_TEACHERS_FAILURE, FETCH_TEACHERS_REQUEST, FETCH_TEACHERS_SUCCESS } from '../actionTypes';

const initState = {
  teachers: [],
  error: null,
  isLoading: false,
};

const reduser = (state = initState, action) => {
  switch (action.type) {
    case FETCH_TEACHERS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_TEACHERS_SUCCESS:
      return { ...state, teachers: action.teachers, isLoading: false, error: null };
    case FETCH_TEACHERS_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};

export default reduser;
