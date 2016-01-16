import React, { PropTypes } from 'react';
import TableOfContents from './TableOfContents';
import ContentView from './ContentView';
import css from './_content.scss';

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
      <div className={css.content}>
        <TableOfContents content={props.model.tableOfContents} />
        <ContentView content={props.model.contents} editing={props.model.editing}
          actions={props.actions} bind={this.props.bind} />
      </div>
    );
  }
}
