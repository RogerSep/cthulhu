import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Root, ProjectGrid, Document } from './components';
import reducers from './redux/reducers/reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,

  // createLogger()
)(createStore);

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

const store = createStoreWithMiddleware(reducer);
const history = createHistory();

syncReduxAndRouter(history, store);

const app = document.createElement('div');
document.body.appendChild(app);

window.gapi.load('auth:client,drive-realtime');

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Root}>
        <IndexRoute component={ProjectGrid} />
        <Route path="projects/:projectId" component={Document} />
      </Route>
    </Router>
  </Provider>,
  app
);
