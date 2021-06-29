const initialState = {
    students: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    // case GET_STUDENTS_SUCCESS:
    //     return {...state, students: action.students}
    default:
      return state;
  }
};

export default reducer;