import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import studentsReducer from './reducers/studentsReducer';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  students: studentsReducer,
  router: connectRouter(history),
});

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;
