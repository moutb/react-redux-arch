import { DEV_MODE } from 'base/env';
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import makeRootReducer from './reducers';
import clientMiddleware from './middleware/clientMiddleware';

const createStore = (initialState = {}) => {
  const middleware = [clientMiddleware(), thunk, logger];

  const enhancers = [];
  let composeEnhancers = compose;

  if (DEV_MODE && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const storeCreator = composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers
  )(createReduxStore);

  const store = storeCreator(makeRootReducer(), initialState);
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

export default createStore;
