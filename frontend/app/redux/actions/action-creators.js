import getJSON from '../../utils/getJSON';

export const SUCCESS_PROJECTS = 'SUCCESS_PROJECTS';
export const successProjects = data => ({type: SUCCESS_PROJECTS, data});

export const FAILURE_PROJECTS = 'FAILURE_PROJECTS';
// TODO: Add failureProjects action creator

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const fetchProjects = () => dispatch => {
  dispatch({type: FETCH_PROJECTS});
  getJSON('/drive/projects')
    .then(json => dispatch(successProjects(json)));
};

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const createProject = (projectName) => dispatch => {
  dispatch({type: CREATE_PROJECT});
  getJSON(`/drive/projects/create/${encodeURIComponent(projectName)}`)
    .then(json => dispatch({type: PROJECT_CREATION, data: json}));
};

export const PROJECT_CREATION = 'PROJECT_CREATION';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const fetchItems = containerId => dispatch => {
  dispatch({type: FETCH_ITEMS});
  getJSON(`/drive/projects?projectId=${encodeURIComponent(containerId)}`)
    .then(json => dispatch({type: ITEMS_FETCHED, data: json}));
};

export const ITEMS_FETCHED = 'ITEMS_FETCHED';
