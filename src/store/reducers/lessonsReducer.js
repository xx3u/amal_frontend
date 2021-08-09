const initState = {
  error: null,
  loading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case DELETE_TEACHER_REQUEST:
      return { ...state, loading: true };
    case DELETE_TEACHER_SUCCESS:
      return { ...state, loading: false };
    case DELETE_TEACHER_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default reducer;
