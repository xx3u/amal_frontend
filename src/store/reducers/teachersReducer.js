import {
  FETCH_TEACHERS_FAILURE,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  DELETE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
  DELETE_TEACHER_FAILURE,
  ADD_NEW_TEACHER_REQUEST,
  ADD_NEW_TEACHER_SUCCESS,
  ADD_NEW_TEACHER_FAILURE,
  UPDATE_TEACHER_REQUEST,
  UPDATE_TEACHER_SUCCESS,
  UPDATE_TEACHER_FAILURE,
  GET_TEACHER_BY_ID_REQUEST,
  GET_TEACHER_BY_ID_SUCCESS,
  GET_TEACHER_BY_ID_FAILURE,
  GET_TEACHERS_BY_SUBJECT_SUCCESS,
  GET_TEACHERS_BY_SUBJECT_FAILURE,
  GET_TEACHERS_LESSONS_REQUEST,
  GET_TEACHERS_LESSONS_FAILURE,
  GET_TEACHERS_LESSONS_SUCCESS,
  SET_TEACHERS_BY_SUBJECT,
  SET_INIT_TEACHER_LESSONS,
} from '../actionTypes';

const initState = {
  teachers: [],
  teacher: {},
  teachersBySubject: [],
  error: null,
  loading: false,
  teachersLessons: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_TEACHERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TEACHERS_SUCCESS:
      return { ...state, teachers: action.teachers, loading: false, error: null };
    case FETCH_TEACHERS_FAILURE:
      return { ...state, error: action.error, loading: false };
    case ADD_NEW_TEACHER_REQUEST:
      return { ...state, loading: true };
    case ADD_NEW_TEACHER_SUCCESS:
      return { ...state, teacher: action.teacher, loading: false, error: null };
    case ADD_NEW_TEACHER_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_TEACHER_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_TEACHER_BY_ID_SUCCESS:
      return { ...state, teacher: action.teacher, loading: false, error: null };
    case GET_TEACHER_BY_ID_FAILURE:
      return { ...state, error: action.error, loading: false };
    case UPDATE_TEACHER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_TEACHER_SUCCESS:
      return { ...state, loading: false, error: null };
    case UPDATE_TEACHER_FAILURE:
      return { ...state, error: action.error, loading: false };
    case DELETE_TEACHER_REQUEST:
      return { ...state, loading: true };
    case DELETE_TEACHER_SUCCESS:
      return { ...state, loading: false };
    case DELETE_TEACHER_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_TEACHERS_BY_SUBJECT_SUCCESS:
      return { ...state, teachersBySubject: action.teachers, error: null };
    case GET_TEACHERS_BY_SUBJECT_FAILURE:
      return { ...state, error: action.error };
    case SET_TEACHERS_BY_SUBJECT:
      return { ...state, teachersBySubject: action.payload };
    case GET_TEACHERS_LESSONS_REQUEST:
      return { ...state, loading: true };
    case GET_TEACHERS_LESSONS_SUCCESS:
      return { ...state, loading: false, teachersLessons: action.data, error: null };
    case GET_TEACHERS_LESSONS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case SET_INIT_TEACHER_LESSONS:
      return { ...state, teachersLessons: [] };
    default:
      return state;
  }
};

export default reducer;
