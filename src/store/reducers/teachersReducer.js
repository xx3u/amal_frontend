import {
  FETCH_TEACHERS_FAILURE,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  DELETE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
  DELETE_TEACHER_FAILURE,
} from '../actionTypes';

const initState = {
  teachers: [],
  deleteMessage: '',
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

export default reduser;
