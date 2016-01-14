import React, { PropTypes } from 'react';
import documentBindings from '../drive/documentBindings';
import { TableOfContents, Content } from './projects';

class Document extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    actions: PropTypes.object,
    projects: PropTypes.object,
    'projects.model': PropTypes.object
  };

  constructor(props) {
    super(props);

    const document = documentBindings(props.params.projectId);
    const dataUpdates = document.skip(1).publish();
    this.subscription = document.subscribe(this);

    dataUpdates.subscribe((doc, event) => {
      this.props.actions.updateModel(JSON.parse(doc.getModel().toJson()));
    });
  }

  render() {
    return (
        <Content
          driveDocument={this.driveDocument}
          model={this.props.projects.model} />
    );
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }

  onNext(document) {
    this.driveDocument = document;
    this.props.actions.updateModel(JSON.parse(document.getModel().toJson()));
  }

  onError(error) {
    this.props.actions.error(error);
  }
}

export default Document;
