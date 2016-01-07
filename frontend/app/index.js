import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './redux/reducers/projects';
import { fetchProjects } from './redux/actions/action-creators'; // TODO: Delete this
import Root from './components/Root';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore);

const store = createStoreWithMiddleware(reducer);

store.dispatch(fetchProjects()); // TODO: Delete this

const app = document.createElement('div');
document.body.appendChild(app);

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  app
);
