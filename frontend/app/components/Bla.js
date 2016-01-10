import React from 'react';
import fetchOnUpdate from '../decorators/fetchOnUpdate';
import css from './bla.scss';

class Bla extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const projects = this.props.projects.projects ? this.props.projects.projects.map(this.renderProject) : [];

    return (
      <div>
        <p>Hola from Bla!!!</p>
        {projects}
        <pre>
          {JSON.stringify(this.props.projects, undefined, 4)}
        </pre>
      </div>
    );
  }

  renderProject (project) {
    return (
      <div key={project.id} className={css.gridItem}>
        <h2>{project.name}</h2>
      </div>
    );
  }
}

export default fetchOnUpdate([], (_, actions) => {
  actions.fetchProjects();
})(Bla);
