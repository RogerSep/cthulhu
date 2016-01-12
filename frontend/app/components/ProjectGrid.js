import React from 'react';
import fetchOnUpdate from '../decorators/fetchOnUpdate';
import CollaborativeItem, { CollaborativeItemCreator } from './presentational/CollaborativeItem';

@fetchOnUpdate([], (_, actions) => {
  actions.fetchProjects();
})
export default class ProjectGrid extends React.Component {
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
    return <CollaborativeItem key={id} name={name} link={`/projects/${id}`}/>;
  }

  create = (name) => {
    this.props.actions.createProject(name);
  };
}

