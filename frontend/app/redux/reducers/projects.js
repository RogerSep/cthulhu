import {
  FETCH_PROJECTS,
  SUCCESS_PROJECTS,
  PROJECT_CREATION,
  CREATE_PROJECT,
  ITEMS_FETCHED,
  FETCH_ITEMS
} from '../actions/action-creators';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_PROJECTS:
    case CREATE_PROJECT:
    case FETCH_ITEMS:
      return {
        ...state,
        isFetching: true
      };
      break;
    case SUCCESS_PROJECTS:
      return {
        ...state,
        isFetching: false,
        projects: action.data
      };
      break;
    case PROJECT_CREATION:
      return {
        ...state,
        isFetching: false,
        projects: (state.projects || []).concat(action.data)
      };
      break;
    case ITEMS_FETCHED:
      return {
        ...state,
        isFetching: false,
        items: (state.projects || []).map(project => {
          if (project.id === action.parentId) {
            return {
              ...project,
              items: action.data
            };
          } else {
            return project;
          }
        })
      };
      break;
    default:
      return state;
  }
};
