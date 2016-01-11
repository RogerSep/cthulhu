import React from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import css from '../main.scss';
import { bindActionCreators } from 'redux';
import {
  fetchProjects,
  successProjects,
  createProject,
  fetchItems
} from '../redux/actions/action-creators';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ css.example }>
        {this.props.children &&
          React.cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}

function selectProps({ projects }) {
  return {
    projects
  };
}

export default connect(selectProps, dispatch => ({
  actions: bindActionCreators({
    fetchProjects,
    successProjects,
    createProject,
    fetchItems
  }, dispatch)
}))(Root);
