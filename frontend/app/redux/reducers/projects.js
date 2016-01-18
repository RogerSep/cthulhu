import {
  FETCH_PROJECTS,
  SUCCESS_PROJECTS,
  PROJECT_CREATION,
  CREATE_PROJECT,
  ITEMS_FETCHED,
  FETCH_ITEMS,
  ERROR,
  UPDATE_MODEL,
  EDIT_COLLABORATIVE_OBJECT,
  FINISH_EDIT_COLLABORATIVE_OBJECT
} from '../actions/action-creators';
import modelConversions from '../../drive/modelConversions';

const initialState = {
  isFetching: false,
  projects: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PROJECTS:

  case CREATE_PROJECT:

  case FETCH_ITEMS:
    return {
      ...state,
      isFetching: true
    };

  case SUCCESS_PROJECTS:
    return {
      ...state,
      isFetching: false,
      projects: [...action.data]
    };

  case PROJECT_CREATION:
    return {
      ...state,
      isFetching: false,
      projects: state.projects.concat(action.data)
    };

  case UPDATE_MODEL:
    const model = modelConversions(action.model);
    const { editing } = state.model || { editing: [] };
    return {
      ...state,
      model: {
        ...model,
        editing
      }
    };

  case EDIT_COLLABORATIVE_OBJECT:
    return {
      ...state,
      model: {
        ...state.model,
        editing: state.model.editing.filter(id => id !== action.objectId).concat(action.objectId)
      }
    };

  case FINISH_EDIT_COLLABORATIVE_OBJECT:
    return {
      ...state,
      model: {
        ...state.model,
        editing: state.model.editing.filter(id => id !== action.objectId)
      }
    };

  case ERROR:
    return {
      ...state,
      error: action.error
    };

  default:
    return state;
  }
};
