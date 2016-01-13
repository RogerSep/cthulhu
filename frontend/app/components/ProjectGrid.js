import React, { PropTypes } from 'react';
import fetchOnUpdate from '../decorators/fetchOnUpdate';
import CollaborativeItem from './presentational/CollaborativeItem/CollaborativeItem';
import CollaborativeItemCreator from './presentational/CollaborativeItemCreator';

class ProjectGrid extends React.Component {
  static propTypes = {
    projects: PropTypes.object,
    actions: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const projects = this.props.projects.projects ? this.props.projects.projects.map(this.renderProject) : [];
    return (
      <div>
        {projects}
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
