import { CREATE_USER_FAILURE, CREATE_USER_SUCCESS } from '../actionTypes';

const initialState = {
  registerError: null,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_FAILURE:
      return { ...state, registerError: action.error };
    case CREATE_USER_SUCCESS:
      return { ...state, user: action.user, registerError: null };
    default:
      return state;
  }
};

export default reducer;
