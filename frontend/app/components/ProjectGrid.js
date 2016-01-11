import React from 'react';
import fetchOnUpdate from '../decorators/fetchOnUpdate';
import CollaborativeItem, { CollaborativeItemCreator } from './presentational/CollaborativeItem';

class ProjectGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const projects = this.props.projects.projects ? this.props.projects.projects.map(this.renderProject) : [];

    return (
      <div>
        {projects}
        <CollaborativeItemCreator create={this.create} />
      </div>
    );
  }

  renderProject (project) {
    return <CollaborativeItem key={project.id} name={project.name} link={`/projects/${project.id}`} />;
  }

  create = (name) => {
    this.props.actions.createProject(name)
  };
}

export default fetchOnUpdate([], (_, actions) => {
  actions.fetchProjects();
})(ProjectGrid);
