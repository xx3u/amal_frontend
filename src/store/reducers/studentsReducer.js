import { FETCH_STUDENTS_FAILURE, FETCH_STUDENTS_SUCCESS } from "../actionTypes";

const initialState = {
    students: [],
    error: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_STUDENTS_SUCCESS:
        return {...state, students: action.students}
    case FETCH_STUDENTS_FAILURE: 
        return {...state, error: action.error}
    default:
      return state;
  }
};

export default reducer;