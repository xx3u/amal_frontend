"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actionTypes = require("../actionTypes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initState = {
  teachers: [],
  teacher: {},
  teachersBySubject: [],
  error: null,
  loading: false,
  teachersLessons: []
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.FETCH_TEACHERS_REQUEST:
      return _objectSpread({}, state, {
        loading: true
      });

    case _actionTypes.FETCH_TEACHERS_SUCCESS:
      return _objectSpread({}, state, {
        teachers: action.teachers,
        loading: false,
        error: null
      });

    case _actionTypes.FETCH_TEACHERS_FAILURE:
      return _objectSpread({}, state, {
        error: action.error,
        loading: false
      });

    case _actionTypes.ADD_NEW_TEACHER_REQUEST:
      return _objectSpread({}, state, {
        loading: true
      });

    case _actionTypes.ADD_NEW_TEACHER_SUCCESS:
      return _objectSpread({}, state, {
        teacher: action.teacher,
        loading: false,
        error: null
      });

    case _actionTypes.ADD_NEW_TEACHER_FAILURE:
      return _objectSpread({}, state, {
        error: action.error,
        loading: false
      });

    case _actionTypes.GET_TEACHER_BY_ID_REQUEST:
      return _objectSpread({}, state, {
        loading: true
      });

    case _actionTypes.GET_TEACHER_BY_ID_SUCCESS:
      return _objectSpread({}, state, {
        teacher: action.teacher,
        loading: false,
        error: null
      });

    case _actionTypes.GET_TEACHER_BY_ID_FAILURE:
      return _objectSpread({}, state, {
        error: action.error,
        loading: false
      });

    case _actionTypes.UPDATE_TEACHER_REQUEST:
      return _objectSpread({}, state, {
        loading: true
      });

    case _actionTypes.UPDATE_TEACHER_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        error: null
      });

    case _actionTypes.UPDATE_TEACHER_FAILURE:
      return _objectSpread({}, state, {
        error: action.error,
        loading: false
      });

    case _actionTypes.DELETE_TEACHER_REQUEST:
      return _objectSpread({}, state, {
        loading: true
      });

    case _actionTypes.DELETE_TEACHER_SUCCESS:
      return _objectSpread({}, state, {
        loading: false
      });

    case _actionTypes.DELETE_TEACHER_FAILURE:
      return _objectSpread({}, state, {
        error: action.error,
        loading: false
      });

    case _actionTypes.GET_TEACHERS_BY_SUBJECT_SUCCESS:
      return _objectSpread({}, state, {
        teachersBySubject: action.teachers,
        error: null
      });

    case _actionTypes.GET_TEACHERS_BY_SUBJECT_FAILURE:
      return _objectSpread({}, state, {
        error: action.error
      });

    case _actionTypes.GET_TEACHERS_LESSONS_REQUEST:
      return _objectSpread({}, state, {
        loading: true
      });

    case _actionTypes.GET_TEACHERS_LESSONS_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        teachersLessons: action.data,
        error: null
      });

    case _actionTypes.GET_TEACHERS_LESSONS_FAILURE:
      return _objectSpread({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
};

var _default = reducer;
exports["default"] = _default;