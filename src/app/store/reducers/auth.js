
const LOAD = 'galeriajs/auth/LOAD';
const LOAD_SUCCESS = 'galeriajs/auth/LOAD_SUCCESS';
const LOAD_ERROR = 'galeriajs/auth/LOAD_ERROR';
const LOGIN = 'galeriajs/auth/LOGIN';
const LOGIN_SUCCESS = 'galeriajs/auth/LOGIN_SUCCESS';
const LOGIN_ERROR = 'galeriajs/auth/LOGIN_ERROR';
const LOGOUT = 'galeriajs/auth/LOGOUT';
const LOGOUT_SUCCESS = 'galeriajs/auth/LOGOUT_SUCCESS';
const LOGOUT_ERROR = 'galeriajs/auth/LOGOUT_ERROR';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  //console.log('updating auth state', state, action)
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result || null
      };
    case LOAD_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        user: null,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        loggingOut: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load(currUser) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_ERROR],
    promise: (client) => new Promise((resolve, reject) => setTimeout(() => resolve(currUser || null), 700))
  };
}

export function login(user, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_ERROR],
    promise: (client) => new Promise((resolve, reject) => setTimeout(() => resolve({
      nickname: user,
      name: 'Demo',
      surname: 'User'
    }), 1000))
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_ERROR],
    promise: (client) => new Promise((resolve, reject) => setTimeout(() => resolve(true), 1000))
  };
}
