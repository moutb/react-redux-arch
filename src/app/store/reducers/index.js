import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import i18n from './i18n';
import auth from './auth';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    translate: i18n,
    routing: routerReducer,
    auth,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return undefined;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
