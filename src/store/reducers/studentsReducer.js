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
} from '../actionTypes';

const initialState = {
  students: [],
  error: null,
  loading: false,
  student: {},
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
      const updatedStudents = [...state.students];
      updatedStudents.push(action.data);
      return { ...state, students: updatedStudents, loading: false };
    }
    case ADD_NEW_STUDENT_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_STUDENT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_STUDENT_BY_ID_SUCCESS:
      return { ...state, student: action.student, loading: false };
    case GET_STUDENT_BY_ID_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default reducer;
