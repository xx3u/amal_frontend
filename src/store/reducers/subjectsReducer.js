import {
  ADD_NEW_SUBJECT_FAILURE,
  ADD_NEW_SUBJECT_REQUEST,
  ADD_NEW_SUBJECT_SUCCESS,
  FETCH_SUBJECTS_FAILURE,
  FETCH_SUBJECTS_REQUEST,
  FETCH_SUBJECTS_SUCCESS,
  UPDATE_SUBJECT_FAILURE,
  UPDATE_SUBJECT_SUCCESS,
} from '../actionTypes';

const initialState = {
  subjects: [],
  error: null,
  loading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBJECTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUBJECTS_SUCCESS:
      return {
        ...state,
        subjects: action.subjects,
        error: null,
        loading: false,
      };
    case FETCH_SUBJECTS_FAILURE:
      return { ...state, error: action.error, loading: false };
    case ADD_NEW_SUBJECT_REQUEST:
      return { ...state, loading: true };
    case ADD_NEW_SUBJECT_SUCCESS: {
      const updatedSubj = [...state.subjects];
      updatedSubj.push(action.data);
      return { ...state, subjects: updatedSubj, loading: false };
    }
    case ADD_NEW_SUBJECT_FAILURE:
      return { ...state, error: action.error, loading: false };
    case UPDATE_SUBJECT_SUCCESS:
      return { ...state, loading: false, error: null };
    case UPDATE_SUBJECT_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default reducer;
