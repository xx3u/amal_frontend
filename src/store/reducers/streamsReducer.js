import {
  FETCH_STREAMS_SUCCESS,
  FETCH_STREAMS_FAILURE,
  FETCH_NEW_STREAM_REQUEST,
  ADD_NEW_STREAM_SUCCESS,
  ADD_NEW_STREAM_FAILURE,
  UPDATE_STREAM_SUCCESS,
  UPDATE_STREAM_FAILURE,
} from '../actionTypes';

const initialState = {
  streams: [],
  loading: false,
  error: null,
};

export default function streamsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STREAMS_SUCCESS:
      return { ...state, streams: action.payload, error: null };
    case FETCH_STREAMS_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_NEW_STREAM_REQUEST:
      return { ...state, loading: true };
    case ADD_NEW_STREAM_SUCCESS: {
      const updatedStr = [...state.streams];
      updatedStr.push(action.data);
      return { ...state, streams: updatedStr, loading: false };
    }
    case ADD_NEW_STREAM_FAILURE:
      return { ...state, error: action.error, loading: false };
    case UPDATE_STREAM_SUCCESS:
      return { ...state, loading: false, error: null };
    case UPDATE_STREAM_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
}
