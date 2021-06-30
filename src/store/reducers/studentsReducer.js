import { FETCH_STUDENTS_SUCCESS } from "../actionTypes";

const initialState = {
    students: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_STUDENTS_SUCCESS:
        return {...state, students: action.students}
    default:
      return state;
  }
};

export default reducer;