import React, { PropTypes } from 'react';
import documentBindings from '../drive/documentBindings';
import { TableOfContents, Content } from './projects';

class Document extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    actions: PropTypes.object
  };

  constructor(props) {
    super(props);

    const document = documentBindings(props.params.projectId);
    this.subscription = document.subscribe(this);
  }

  render() {
    return (
      <div>
        <TableOfContents />
        <Content />
      </div>
    );
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }

  onNext(document) {
    this.props.actions.updateModel(JSON.parse(document.getModel().toJson()));
  }

  onError(error) {
    this.props.actions.error(error);
  }
}

export default Document;
