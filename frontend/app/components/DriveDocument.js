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
  }

  render() {
    return (
        <Content
          drive={this.drive}
          actions={this.props.actions}
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

  drive = {
    bindString: (objectId, textarea) => {
      const collaborativeString = this.driveDocument.getModel().getRoot().get('sections').asArray().reduce((found, section) => {
        if (section.containsCollaborativeString(objectId)) {
          return section.content;
        }

        return found;
      }, null);

      if (!!collaborativeString && !!textarea) {
        return window.gapi.drive.realtime.databinding.bindString(collaborativeString, textarea);
      }
    },
    addSection: () => {
      const model = this.driveDocument.getModel();
      const root = model.getRoot();

      const section = model.create('TextSection');
      section.order = 0;
      root.get('sections').push(section);
    }
  };
}

export default DriveDocument;
