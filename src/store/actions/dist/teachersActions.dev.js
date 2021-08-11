"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTeachersLessons = exports.getTeachersBySubject = exports.getTeacherById = exports.editTeacher = exports.addTeacher = exports.deleteTeacher = exports.fetchTeachers = void 0;

var _axiosApi = _interopRequireDefault(require("../../axiosApi"));

var _connectedReactRouter = require("connected-react-router");

var _actionTypes = require("../actionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchTeachersRequest = function fetchTeachersRequest() {
  return {
    type: _actionTypes.FETCH_TEACHERS_REQUEST
  };
};

var fetchTeachersFailure = function fetchTeachersFailure(error) {
  return {
    type: _actionTypes.FETCH_TEACHERS_FAILURE,
    error: error
  };
};

var fetchTeachersSuccess = function fetchTeachersSuccess(teachers) {
  return {
    type: _actionTypes.FETCH_TEACHERS_SUCCESS,
    teachers: teachers
  };
};

var fetchTeachers = function fetchTeachers() {
  return function _callee(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch(fetchTeachersRequest());
            _context.next = 4;
            return regeneratorRuntime.awrap(_axiosApi["default"].get('/teachers'));

          case 4:
            response = _context.sent;
            dispatch(fetchTeachersSuccess(response.data));
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            dispatch(fetchTeachersFailure(_context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.fetchTeachers = fetchTeachers;

var deleteTeacherRequest = function deleteTeacherRequest() {
  return {
    type: _actionTypes.DELETE_TEACHER_REQUEST
  };
};

var deleteTeacherSuccess = function deleteTeacherSuccess(message) {
  return {
    type: _actionTypes.DELETE_TEACHER_SUCCESS,
    message: message
  };
};

var deleteTeacherFailure = function deleteTeacherFailure(error) {
  return {
    type: _actionTypes.DELETE_TEACHER_FAILURE,
    error: error
  };
};

var deleteTeacher = function deleteTeacher(teacherId) {
  return function _callee2(dispatch) {
    var resp;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch(deleteTeacherRequest());
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axiosApi["default"]["delete"]("/teachers/".concat(teacherId)));

          case 4:
            resp = _context2.sent;
            dispatch(deleteTeacherSuccess(resp.data));
            dispatch(fetchTeachers());
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            dispatch(deleteTeacherFailure(_context2.t0));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.deleteTeacher = deleteTeacher;

var addTeacherRequest = function addTeacherRequest() {
  return {
    type: _actionTypes.ADD_NEW_TEACHER_REQUEST
  };
};

var addTeacherSucces = function addTeacherSucces(teacher) {
  return {
    type: _actionTypes.ADD_NEW_TEACHER_SUCCESS,
    teacher: teacher
  };
};

var addTeacherFailure = function addTeacherFailure(error) {
  return {
    type: _actionTypes.ADD_NEW_TEACHER_FAILURE,
    error: error
  };
};

var addTeacher = function addTeacher(teacher) {
  return function _callee3(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            dispatch(addTeacherRequest());
            _context3.next = 4;
            return regeneratorRuntime.awrap(_axiosApi["default"].post('/teachers', teacher));

          case 4:
            response = _context3.sent;
            dispatch(addTeacherSucces(response.data));
            dispatch((0, _connectedReactRouter.push)('/admin-app/teachers'));
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            dispatch(addTeacherFailure(_context3.t0));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.addTeacher = addTeacher;

var editTeacherRequest = function editTeacherRequest() {
  return {
    type: _actionTypes.UPDATE_TEACHER_REQUEST
  };
};

var editTeacherSuccess = function editTeacherSuccess() {
  return {
    type: _actionTypes.UPDATE_TEACHER_SUCCESS
  };
};

var editTeacherFailure = function editTeacherFailure(error) {
  return {
    type: _actionTypes.UPDATE_TEACHER_FAILURE,
    error: error
  };
};

var editTeacher = function editTeacher(teacher, id) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            dispatch(editTeacherRequest());
            _context4.next = 4;
            return regeneratorRuntime.awrap(_axiosApi["default"].put("/teachers/".concat(id), teacher));

          case 4:
            dispatch(editTeacherSuccess());
            dispatch((0, _connectedReactRouter.push)('/admin-app/teachers'));
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            dispatch(editTeacherFailure(_context4.t0));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.editTeacher = editTeacher;

var getTeacherByIdRequest = function getTeacherByIdRequest() {
  return {
    type: _actionTypes.GET_TEACHER_BY_ID_REQUEST
  };
};

var getTeacherByIdSuccess = function getTeacherByIdSuccess(teacher) {
  return {
    type: _actionTypes.GET_TEACHER_BY_ID_SUCCESS,
    teacher: teacher
  };
};

var getTeacherByIdFailure = function getTeacherByIdFailure(error) {
  return {
    type: _actionTypes.GET_TEACHER_BY_ID_FAILURE,
    error: error
  };
};

var getTeacherById = function getTeacherById(id) {
  return function _callee5(dispatch) {
    var resp;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            dispatch(getTeacherByIdRequest());
            _context5.next = 4;
            return regeneratorRuntime.awrap(_axiosApi["default"].get('/teachers/' + id));

          case 4:
            resp = _context5.sent;
            dispatch(getTeacherByIdSuccess(resp.data));
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            dispatch(getTeacherByIdFailure(_context5.t0));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.getTeacherById = getTeacherById;

var getTeachersBySubjectSuccess = function getTeachersBySubjectSuccess(teachers) {
  return {
    type: _actionTypes.GET_TEACHERS_BY_SUBJECT_SUCCESS,
    teachers: teachers
  };
};

var getTeachersBySubjectFailure = function getTeachersBySubjectFailure(error) {
  return {
    type: _actionTypes.GET_TEACHERS_BY_SUBJECT_FAILURE,
    error: error
  };
};

var getTeachersBySubject = function getTeachersBySubject(id) {
  return function _callee6(dispatch) {
    var resp;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(_axiosApi["default"].get("/teachers?subjectId=".concat(id)));

          case 3:
            resp = _context6.sent;
            dispatch(getTeachersBySubjectSuccess(resp.data));
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            dispatch(getTeachersBySubjectFailure(_context6.t0));

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.getTeachersBySubject = getTeachersBySubject;

var getTeachersLessonsRequest = function getTeachersLessonsRequest() {
  return {
    type: _actionTypes.GET_TEACHERS_LESSONS_REQUEST
  };
};

var getTeachersLessonsSuccess = function getTeachersLessonsSuccess(data) {
  return {
    type: _actionTypes.GET_TEACHERS_LESSONS_SUCCESS,
    data: data
  };
};

var getTeachersLessonsFailure = function getTeachersLessonsFailure(error) {
  return {
    type: _actionTypes.GET_TEACHERS_LESSONS_FAILURE,
    error: error
  };
};

var getTeachersLessons = function getTeachersLessons(teacherId, startTime, endTime) {
  return function _callee7(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            dispatch(getTeachersLessonsRequest());
            _context7.next = 4;
            return regeneratorRuntime.awrap(_axiosApi["default"].get("/teachers/".concat(teacherId, "/lessons?startTime=").concat(startTime, "&endTime=").concat(endTime)));

          case 4:
            response = _context7.sent;
            dispatch(getTeachersLessonsSuccess(response.data));
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            dispatch(getTeachersLessonsFailure(_context7.t0));

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.getTeachersLessons = getTeachersLessons;