import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import App from 'components/App';
import createStore from 'store/createStore';

const initialState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = createStore(initialState);
const container = document.getElementById('app');
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

// require('helpers/browserHistory')().set(history);

const element = (
  <Provider store={store}>
    <App history={history} />
  </Provider>
);

hydrate(element, container);
