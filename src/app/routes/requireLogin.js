import { isLoaded as isAuthLoaded, load as loadAuth } from 'app/store/reducers/auth';

const checkAuth = (store, replace, cb) => {
  const { auth: { user } } = store.getState();
  if (user == null) {
    replace('/login');
  }
  cb();
};

export default (store) => {
  return (nextState, replace, cb)  => {
    if (!isAuthLoaded(store.getState())) {
      let { auth: {user} }  = store.getState();
      store.dispatch(loadAuth(user)).then(checkAuth.bind(this, store, replace, cb));
    } else {
      checkAuth(store, replace, cb);
    }
  };
};
