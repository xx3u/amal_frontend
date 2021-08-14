import {
  ADD_NEW_STUDENT_FAILURE,
  ADD_NEW_STUDENT_REQUEST,
  ADD_NEW_STUDENT_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  GET_STUDENT_BY_ID_FAILURE,
  GET_STUDENT_BY_ID_REQUEST,
  GET_STUDENT_BY_ID_SUCCESS,
  UPDATE_STUDENT_FAILURE,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
} from '../actionTypes';

const initialState = {
  students: [],
  error: null,
  loading: false,
  student: {},
  updatedStudent: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.students,
        error: null,
        loading: false,
      };
    case FETCH_STUDENTS_FAILURE:
      return { ...state, error: action.error, loading: false };
    case ADD_NEW_STUDENT_REQUEST:
      return { ...state, loading: true };
    case ADD_NEW_STUDENT_SUCCESS: {
      return { ...state, loading: false };
    }
    case ADD_NEW_STUDENT_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_STUDENT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_STUDENT_BY_ID_SUCCESS:
      return { ...state, student: action.student, loading: false };
    case GET_STUDENT_BY_ID_FAILURE:
      return { ...state, error: action.error, loading: false };
    case UPDATE_STUDENT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_STUDENT_SUCCESS:
      return { ...state, updatedStudent: action.data, loading: false };
    case UPDATE_STUDENT_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default reducer;
