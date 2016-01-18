import React, { Component, PropTypes } from 'react';
import TableOfContents from './TableOfContents';
import ContentView from './ContentView';
import CSSModules from 'react-css-modules';
import styles from './_content.scss';

export default class Content extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    model: PropTypes.object,
    bind: PropTypes.func,
    drive: PropTypes.object
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
      <div className='row'>
        <TableOfContents content={props.model.tableOfContents} />
        <ContentView content={props.model.contents}
                     editing={props.model.editing}
                     actions={props.actions}
                     drive={this.props.drive} />
      </div>
    );
  }
}

export default CSSModules(Content, styles);
