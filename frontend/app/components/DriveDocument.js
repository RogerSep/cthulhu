import React, { Component, PropTypes } from 'react';
import documentBindings from '../drive/documentBindings';
import TableOfContents from './projects/TableOfContents';
import Content from './projects/Content';

class DriveDocument extends Component {

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

    this.bind = (objectId, textarea) => {
      const collaborativeString = this.driveDocument.getModel().getRoot().get('sections').asArray().reduce((found, section) => {
        if (section.getId() === objectId) {
          return section.get('content');
        }

        return found;
      }, null);

      if (textarea) {
        return window.gapi.drive.realtime.databinding.bindString(collaborativeString, textarea);
      }
    };
  }

  render() {
    return (
        <Content
          driveDocument={this.driveDocument}
          actions={this.props.actions}
          model={this.props.projects.model}
          bind={this.bind} />
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

export default DriveDocument;
