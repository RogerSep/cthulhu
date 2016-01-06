import { FETCH_PROJECTS, SUCCESS_PROJECTS } from '../action-types/projects';
import fetch from 'isomorphic-fetch';

export default {
  fetchProjects: _ => dispatch => {
    dispatch({type: FETCH_PROJECTS});

    return fetch('/drive/projects', {
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(json => dispatch({type: SUCCESS_PROJECTS, data: json}));
  }
};