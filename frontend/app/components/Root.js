import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { bindActionCreators } from 'redux';
import {
  fetchProjects,
  successProjects,
  createProject,
  fetchItems,
  updateModel,
  error,
  editCollaborativeObject,
  finishEditCollaborativeObject,
  activateModal,
  placeMarker
} from '../redux/actions/action-creators';

import commonStyles from '../styles/_base.scss';

class Root extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}

export default connect(
  state => ({
    projects: state.projects
  }),
  dispatch => {
    const actions = bindActionCreators({
      fetchProjects,
      successProjects,
      createProject,
      fetchItems,
      updateModel,
      error,
      editCollaborativeObject,
      finishEditCollaborativeObject,
      activateModal,
      placeMarker
    }, dispatch);

    return {
      actions: Object.assign(actions, {
        router: bindActionCreators({ ...routeActions }, dispatch)
      })
    };
  }
)(Root);
