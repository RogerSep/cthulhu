import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { fetchProjects } from './redux/actions/action-creators'; // TODO: Delete this
import Root from './components/Root';
import Bla from './components/Bla';
import reducers from './redux/reducers/reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore);

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

const store = createStoreWithMiddleware(reducer);
const history = createHistory();

syncReduxAndRouter(history, store);

store.dispatch(fetchProjects()); // TODO: Delete this

const app = document.createElement('div');
document.body.appendChild(app);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Root}>
        <Route path="/bla" component={Bla} />
      </Route>
    </Router>
  </Provider>,
  app
);
