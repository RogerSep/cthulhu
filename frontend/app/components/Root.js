import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import { bindActionCreators } from 'redux';
import {
  fetchProjects,
  successProjects,
  createProject,
  fetchItems
} from '../redux/actions/action-creators';

import commonStyles from '../styles/_base.scss';

class Root extends React.Component {
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
  dispatch => ({
    actions: bindActionCreators({
      fetchProjects,
      successProjects,
      createProject,
      fetchItems
    }, dispatch)
  })
)(Root);
