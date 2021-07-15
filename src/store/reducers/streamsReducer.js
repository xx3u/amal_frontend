import { FETCH_STREAMS_SUCCESS, FETCH_STREAMS_FAILURE } from '../actionTypes';

const initialState = {
  streams: [],
  error: null,
};

export default function streamsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STREAMS_SUCCESS:
      return { ...state, streams: action.payload, error: null };
    case FETCH_STREAMS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
