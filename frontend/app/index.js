import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'redux-simple-router';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import Root from './components/Root';
import ProjectGrid from './components/ProjectGrid';
import DriveDocument from './components/DriveDocument';
import reducers from './redux/reducers/reducers';
import driveInitialize from './drive';

const reduxRouterMiddleware = syncHistory(browserHistory);
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

const createStoreWithMiddleware = applyMiddleware(
  reduxRouterMiddleware,
  thunkMiddleware,
  createLogger()
)(createStore);

const store = createStoreWithMiddleware(reducer);

const app = document.createElement('div');
document.body.appendChild(app);

driveInitialize();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/"
             component={Root}>
        <IndexRoute component={ProjectGrid} />
        <Route path="projects/:projectId"
               component={DriveDocument} />
      </Route>
    </Router>
  </Provider>,
  app
);
