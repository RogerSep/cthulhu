import React, { PropTypes } from 'react';
import fetchOnUpdate from '../decorators/fetchOnUpdate';
import CollaborativeItem from './presentational/CollaborativeItem';
import CollaborativeItemCreator from './presentational/CollaborativeItemCreator';

class DocumentationGrid extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    actions: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items || [];

    return (
      <div>
        {items}
        <CollaborativeItemCreator create={this.create}/>
      </div>
    );
  }

  renderItem(item) {
    return (
      <CollaborativeItem
        key={item.id}
        name={item.name}
        link={``}/>
    );
  }

  create(name) {
    this.props.actions.createItem(name);
  }
}

export default fetchOnUpdate(['projectId'], (params, actions) => {
  actions.fetchItems(params.projectId);
})(DocumentationGrid);
