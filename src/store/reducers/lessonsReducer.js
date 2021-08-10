import { CREATE_LESSONS_REQUEST, CREATE_LESSONS_SUCCESS, CREATE_LESSONS_FAILURE } from '../actionTypes';

const initState = {
  lessons: [],
  loading: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_LESSONS_REQUEST:
      return { ... state, loading: true };
    case CREATE_LESSONS_SUCCESS:
      return { ...state, loading: false };
    case CREATE_LESSONS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default reducer;
