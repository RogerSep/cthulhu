import getJSON from '../../utils/getJSON';

export const SUCCESS_PROJECTS = 'SUCCESS_PROJECTS';
export const successProjects = data => ({ type: SUCCESS_PROJECTS, data });

export const FAILURE_PROJECTS = 'FAILURE_PROJECTS';

export const PROJECT_CREATION = 'PROJECT_CREATION';

export const ITEMS_FETCHED = 'ITEMS_FETCHED';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const fetchProjects = () => dispatch => {
  dispatch({ type: FETCH_PROJECTS });
  getJSON('/drive/projects')
    .then(json => dispatch(successProjects(json)));
};

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const createProject = (projectName) => dispatch => {
  dispatch({ type: CREATE_PROJECT });
  getJSON(`/drive/projects/create/${encodeURIComponent(projectName)}`)
    .then(json => dispatch({ type: PROJECT_CREATION, data: json }));
};


export const FETCH_ITEMS = 'FETCH_ITEMS';
export const fetchItems = containerId => dispatch => {
  dispatch({ type: FETCH_ITEMS });
  getJSON(`/drive/projects?projectId=${encodeURIComponent(containerId)}`)
    .then(json => dispatch({ type: ITEMS_FETCHED, data: json }));
};

export const ERROR = 'ERROR';
export const error = err => ({ type: ERROR, error: err });

export const UPDATE_MODEL = 'UDPATE_MODEL';
export const updateModel = model => ({ type: UPDATE_MODEL, model });

export const EDIT_COLLABORATIVE_OBJECT = 'EDIT_COLLABORATIVE_OBJECT';
export const editCollaborativeObject = objectId => ({ type: EDIT_COLLABORATIVE_OBJECT, objectId });

export const FINISH_EDIT_COLLABORATIVE_OBJECT = 'FINISH_EDIT_COLLABORATIVE_OBJECT';
export const finishEditCollaborativeObject = objectId => ({ type: FINISH_EDIT_COLLABORATIVE_OBJECT, objectId });

export const ACTIVATE_MODAL = 'ACTIVATE_MODAL';
export const activateModal = (active = true) => ({ type: ACTIVATE_MODAL, active: active });

export const PLACE_MARKER = 'PLACE_MARKER';
export const placeMarker = marker => ({ type: PLACE_MARKER, marker });
