import * as Types from '../action-types/projects';

export default (state = {}, action) => {
  switch(action.type) {
    case Types.FETCH_PROJECTS:
      return {
        ...state,
        isFetching: true
      };
      break;
    case Types.SUCCESS_PROJECTS:
      return {
        ...state,
        isFetching: false,
        projects: action.data
      };
      break;
    default:
      return state;
      break;
  }
};