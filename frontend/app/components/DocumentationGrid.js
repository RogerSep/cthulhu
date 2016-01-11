import React from 'react';
import fetchOnUpdate from '../decorators/fetchOnUpdate';
import CollaborativeItem, { CollaborativeItemCreator } from './presentational/CollaborativeItem';

class DocumentationGrid extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const items = this.props.items || [];

    return (
      <div>
        {items}
        <CollaborativeItemCreator create={this.create} />
      </div>
    );
  }

  renderItem = item => <CollaborativeItem key={item.id} name={item.name} link={``} />;

  create = (name) => {
    this.props.actions.createItem(name);
  };
}

export default fetchOnUpdate(['projectId'], (params, actions) => {
  actions.fetchItems(params.projectId);
})(DocumentationGrid);
