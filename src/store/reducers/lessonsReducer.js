import { FETCH_LESSONS_FAILURE, FETCH_LESSONS_REQUEST, FETCH_LESSONS_SUCCESS } from '../actionTypes';
const initState = {
  lessons: [],
  loading: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_LESSONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_LESSONS_SUCCESS:
      return { ...state, lessons: action.lessons, loading: false, error: null };
    case FETCH_LESSONS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default reducer;
