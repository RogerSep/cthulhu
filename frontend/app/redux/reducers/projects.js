import {
  FETCH_PROJECTS,
  SUCCESS_PROJECTS,
  PROJECT_CREATION,
  CREATE_PROJECT
} from '../actions/action-creators';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_PROJECTS:
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
    case CREATE_PROJECT:
      return {
        ...state,
        isFetching: true
      };
      break;
    case PROJECT_CREATION:
      return {
        ...state,
        isFetching: false,
        projects: (state.projects || []).concat(action.data)
      }
    default:
      return state;
  }
};
