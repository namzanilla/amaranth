import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import reducers from 'store/reducers';

const {NODE_ENV = 'production'} = process.env;

let reduxDevTools;

if ('object' === typeof window && NODE_ENV === 'development') {
  const {
    __REDUX_DEVTOOLS_EXTENSION__,
  } = window;

  reduxDevTools = __REDUX_DEVTOOLS_EXTENSION__;
}

export default (initialState = {}) => {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk),
      reduxDevTools ? reduxDevTools() : f => f,
    )
  );
};
