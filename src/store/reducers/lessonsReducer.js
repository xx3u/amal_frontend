<<<<<<< HEAD
const initState = {
  error: null,
  loading: false,
=======
import {
  ADD_NEW_LESSON_FAILURE,
  ADD_NEW_LESSON_REQUEST,
  ADD_NEW_LESSON_SUCCESS,
  FETCH_LESSONS_FAILURE,
  FETCH_LESSONS_REQUEST,
  FETCH_LESSONS_SUCCESS,
} from '../actionTypes';
const initState = {
  lessons: [],
  loading: false,
  error: null,
>>>>>>> a3244c1ce6d12a2de815ae67c31ad167b5384cf5
};

const reducer = (state = initState, action) => {
  switch (action.type) {
<<<<<<< HEAD
    case DELETE_TEACHER_REQUEST:
      return { ...state, loading: true };
    case DELETE_TEACHER_SUCCESS:
      return { ...state, loading: false };
    case DELETE_TEACHER_FAILURE:
      return { ...state, error: action.error, loading: false };
=======
    case FETCH_LESSONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_LESSONS_SUCCESS:
      return { ...state, lessons: action.lessons, loading: false, error: null };
    case FETCH_LESSONS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ADD_NEW_LESSON_REQUEST:
      return { ...state, loading: true };
    case ADD_NEW_LESSON_SUCCESS:
      return { ...state, loading: false, error: null };
    case ADD_NEW_LESSON_FAILURE:
      return { ...state, loading: false, error: action.error };
>>>>>>> a3244c1ce6d12a2de815ae67c31ad167b5384cf5
    default:
      return state;
  }
};

export default reducer;
