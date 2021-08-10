import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import studentsReducer from './reducers/studentsReducer';
import groupsReducer from './reducers/groupsReducer';
import streamsReducer from './reducers/streamsReducer';
import paymentsReducer from './reducers/paymentsReducer';
import subjectsReducer from './reducers/subjectsReducer';
import teachersReducer from './reducers/teachersReducer';
import lessonsReducer from './reducers/lessonsReducer';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  students: studentsReducer,
  groups: groupsReducer,
  streams: streamsReducer,
  payments: paymentsReducer,
  subjects: subjectsReducer,
  teachers: teachersReducer,
  lessons: lessonsReducer,
  router: connectRouter(history),
});

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;
