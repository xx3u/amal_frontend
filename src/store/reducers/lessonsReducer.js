import {
  ADD_NEW_LESSON_FAILURE,
  ADD_NEW_LESSON_REQUEST,
  ADD_NEW_LESSON_SUCCESS,
  FETCH_LESSONS_FAILURE,
  FETCH_LESSONS_REQUEST,
  FETCH_LESSONS_SUCCESS,
  DELETE_LESSON_FAILURE,
  DELETE_LESSON_REQUEST,
  DELETE_LESSON_SUCCESS,
  CREATE_LESSONS_REQUEST,
  CREATE_LESSONS_SUCCESS,
  CREATE_LESSONS_FAILURE,
  SET_LESSON_PARAMS,
  SET_INIT_LESSONS,
  ADD_ATTENDANCE_REQUEST,
  ADD_ATTENDANCE_SUCCESS,
  ADD_ATTENDANCE_FAILURE,
} from '../actionTypes';

const initlessonsParams = {
  groupId: '',
  subjectId: '',
  teacherId: '',
  startTime: '',
  endTime: '',
};
const initState = {
  lessons: [],
  loading: false,
  error: null,
  lessonsParams: initlessonsParams,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_LESSONS_REQUEST:
      return { ...state, loading: true };
    case CREATE_LESSONS_SUCCESS:
      return { ...state, loading: false, error: null };
    case CREATE_LESSONS_FAILURE:
      return { ...state, loading: false, error: action.error };
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
    case SET_LESSON_PARAMS:
      return { ...state, lessonsParams: action.payload };
    case SET_INIT_LESSONS:
      return { ...state, lessons: [] };
    case DELETE_LESSON_REQUEST:
      return { ...state, loading: true };
    case DELETE_LESSON_SUCCESS:
      return { ...state, loading: false };
    case DELETE_LESSON_FAILURE:
      return { ...state, error: action.error, loading: false };
    case ADD_ATTENDANCE_REQUEST:
      return { ...state, loading: true };
    case ADD_ATTENDANCE_SUCCESS:
      return { ...state, loading: false };
    case ADD_ATTENDANCE_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default reducer;
