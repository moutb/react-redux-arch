import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'app/containers/App/';
import Main from 'app/containers/Main/';
import Login from 'app/containers/Login/';
import NotFound from 'app/components/NotFound/';

import requireLogin from './requireLogin';

export default function routes (store) {
  return (
    <Route component={ App }>
      <Route onEnter={ requireLogin(store) } path="home" component={ Main }>
        <IndexRoute component = { Main } />
        <Route path="home" component={ Main } />
      </Route>
      <Redirect exact={ true } from="/" to="/home" />
      <Route path="login" component= { Login } />
      <Route path="*" component={ NotFound } status={ 404 } />
    </Route>
  );
}
