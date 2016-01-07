import React from 'react';
import fetchOnUpdate from '../decorators/fetchOnUpdate';

@fetchOnUpdate([], (_, actions) => {
  actions.fetchProjects();
})
class Bla extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Hola from Bla!!!</div>
    );
  }
}

export default Bla;
