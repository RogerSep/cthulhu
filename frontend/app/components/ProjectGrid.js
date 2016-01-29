import React, { Component, PropTypes } from 'react';
import fetchOnUpdate from '../decorators/fetchOnUpdate';
import CollaborativeItem from './presentational/CollaborativeItem/CollaborativeItem';
import CollaborativeItemCreator from './presentational/CollaborativeItemCreator';
import css from './ProjectGrid.scss';

class ProjectGrid extends Component {
  static propTypes = {
    projects: PropTypes.object,
    actions: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.create = this.create.bind(this);
  }

  render() {
    const projects = this.props.projects.projects ? this.props.projects.projects.map(this.renderProject) : [];
    return (
      <div>
        <div className={css.projectList}>{projects}</div>
        <CollaborativeItemCreator create={this.create}/>
      </div>
    );
  }

  renderProject({ id, name }) {
    return (
      <CollaborativeItem
        key={id}
        name={name}
        link={`/projects/${id}`}/>
    );
  }

  create(name) {
    this.props.actions.createProject(name);
  }
}

export default fetchOnUpdate([], (_, actions) => {
  actions.fetchProjects();
})(ProjectGrid);
