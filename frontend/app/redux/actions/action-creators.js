import fetch from 'isomorphic-fetch';

export const SUCCESS_PROJECTS = 'SUCCESS_PROJECTS';
export const successProjects = data => ({ type: SUCCESS_PROJECTS, data });

export const FAILURE_PROJECTS = 'FAILURE_PROJECTS';
// TODO: Add failureProjects action creator

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const fetchProjects = () => dispatch => {
  dispatch({ type: FETCH_PROJECTS });
  fetch('/drive/projects', { credentials: 'same-origin' })
    .then(response => response.json())
    .then(json => dispatch(successProjects(json)));
};
