import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { DEV_MODE } from 'base/env';

import routes from 'app/routes/';
import createStore from 'app/store/createStore';


const store = createStore(window.__APP_REDUX_STATE__);

const history = syncHistoryWithStore(browserHistory, store);

const MOUNT_NODE = document.getElementById('root');

let renderApp = () => {
  render(
    <Provider store={ store }>
      <Router history={ history } routes={ routes(store) } />
    </Provider>,
    MOUNT_NODE
  );
};

// Development Tools
if (DEV_MODE) {
  if (module.hot) {
    const renderApp_ = renderApp;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;
      render(<RedBox error={ error } />, MOUNT_NODE);
    };

    renderApp = () => {
      try {
        renderApp_();
      } catch (e) {
        console.error(e);
        renderError(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept([
      'app/containers/App',
      'app/routes/index',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        renderApp();
      })
    );
  }
}

renderApp();
