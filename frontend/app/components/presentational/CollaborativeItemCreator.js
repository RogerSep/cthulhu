import React, { Component, PropTypes } from 'react';

class CollaborativeItemCreator extends Component {
  static propTypes = {
    create: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.create = this.create.bind(this);
  }

  render() {
    return (
      <input
        onKeyPress={this.create}/>
    );
  }

  create(e) {
    if (e.key === 'Enter' && e.target.value) {
      this.props.create(e.target.value);
    }
  }
}

export default CollaborativeItemCreator;
