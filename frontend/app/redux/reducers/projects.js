import {
  FETCH_PROJECTS,
  SUCCESS_PROJECTS
} from '../actions/action-creators';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        isFetching: true
      };

    case SUCCESS_PROJECTS:
      return {
        ...state,
        isFetching: false,
        projects: action.data
      };

    default:
      return state;
  }
};
