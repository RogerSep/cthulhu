import React, { PropTypes } from 'react';
import TableOfContents from './TableOfContents';
import ContentView from './ContentView';

export default class Content extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    model: PropTypes.object,
    bind: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;

    if (!props.model) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <TableOfContents content={props.model.tableOfContents} />
        <ContentView content={props.model.contents} editing={props.model.editing}
          actions={props.actions} bind={this.props.bind} />
      </div>
    );
  }
}
