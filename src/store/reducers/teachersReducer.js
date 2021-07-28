import {
  FETCH_TEACHERS_FAILURE,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  DELETE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
  DELETE_TEACHER_FAILURE,
  ADD_TEACHER_REQUEST,
  ADD_TEACHER_FAILURE,
  ADD_TEACHER_SUCCESS,
  GET_TEACHER_BY_ID_REQUEST,
  GET_TEACHER_BY_ID_SUCCESS,
  GET_TEACHER_BY_ID_FAILURE,
  EDIT_TEACHER_REQUEST,
  EDIT_TEACHER_SUCCESS,
  EDIT_TEACHER_FAILURE,
} from '../actionTypes';

const initState = {
  teachers: [],
  teacher: {},
  deleteMessage: '',
  error: null,
  isLoading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_TEACHERS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_TEACHERS_SUCCESS:
      return { ...state, teachers: action.teachers, isLoading: false, error: null };
    case FETCH_TEACHERS_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case ADD_TEACHER_REQUEST:
      return { ...state, isLoading: true };
    case ADD_TEACHER_SUCCESS:
      return { ...state, teacher: action.teacher, isLoading: false, error: null };
    case ADD_TEACHER_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case GET_TEACHER_BY_ID_REQUEST:
      return { ...state, isLoading: true };
    case GET_TEACHER_BY_ID_SUCCESS:
      return { ...state, teacher: action.teacher, isLoading: false, error: null };
    case GET_TEACHER_BY_ID_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case EDIT_TEACHER_REQUEST:
      return { ...state, isLoading: true };
    case EDIT_TEACHER_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case EDIT_TEACHER_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case DELETE_TEACHER_REQUEST:
      return { ...state, isLoading: true };
    case DELETE_TEACHER_SUCCESS:
      return { ...state, deleteMessage: action.message, isLoading: false };
    case DELETE_TEACHER_FAILURE:
      return { ...state, deleteMessage: action.error, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
