import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import rootReducer from './reducers/rootReducer';
import { rootSaga } from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);
sagaMiddleware.run(rootSaga);

export default store;
