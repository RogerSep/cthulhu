import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './redux/reducers/projects';
import projects from './redux/action-creators/projects';
import Root from './components/Root';
import css from './main.scss';

const initialState = {};
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);
const store = createStoreWithMiddleware(reducer, initialState);

store.dispatch(projects.fetchProjects());

const app = document.createElement('div');
document.body.appendChild(app);

ReactDom.render(<Root store={store} />, app);
