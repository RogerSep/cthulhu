import fetch from 'isomorphic-fetch';

export const SUCCESS_PROJECTS = 'SUCCESS_PROJECTS';
export const successProjects = data => ({ type: SUCCESS_PROJECTS, data });

export const FAILURE_PROJECTS = 'FAILURE_PROJECTS';
// TODO: Add failureProjects action creator

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const fetchProjects = () => dispatch => {
  dispatch({ type: FETCH_PROJECTS });
  return fetch('/drive/projects', { credentials: 'same-origin' })
    .then(response => response.json())
    .then(json => dispatch(successProjects(json)));
};

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const createProject = (projectName) => dispatch => {
  dispatch({ type: CREATE_PROJECT });
  return fetch(`/drive/projects/create/${encodeURIComponent(projectName)}`, {credentials: 'same-origin'})
    .then(response => response.json())
    .then(json => dispatch({ type: PROJECT_CREATION, data: json }));
};

export const PROJECT_CREATION = 'PROJECT_CREATION';
