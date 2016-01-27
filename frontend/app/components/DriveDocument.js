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
    const section = (this.props.params.splat || '/').split('/')[0];
    const path = `/projects/${this.props.params.projectId}${(section && '/') + section}`;

    return (
        <Content
          drive={this.drive}
          actions={this.props.actions}
          model={this.props.projects.model}
          path={({
            project: `/projects/${this.props.params.projectId}`,
            active: path
          })} />
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

    if (!this.props.params.splat) {
      const firstSection = document.getModel().getRoot()
        .get('sections')
        .asArray()
        .filter(section => section.get('parent') === '' && section.get('order') === 0)
        .reduce((_, section) => section.getId(), '');
      this.props.actions.router.replace('/projects/' + this.props.params.projectId + '/' + firstSection);
    }
  }

  onError(error) {
    this.props.actions.error(error);
  }

  drive = {
    bindString: (objectId, textarea) => {
      const collaborativeString = this.driveDocument.getModel().getRoot().get('sections').asArray().reduce((found, section) => {
        const type = section.get('type');

        if (found) {
          return found;
        } else if (type === 'text' && section.getId() === objectId) {
          return section.get('content');
        } else if (type === 'annotatedImage') {
          return section.get('annotations').asArray().reduce((found, annotation) => {
            if (annotation.get('content').getId() === objectId) {
              return annotation.get('content');
            }

            return found;
          }, null);
        }

        return found;
      }, null);

      if (!!collaborativeString && !!textarea) {
        return window.gapi.drive.realtime.databinding.bindString(collaborativeString, textarea);
      }
    },
    addSection: (parentId = '') => {
      const model = this.driveDocument.getModel();
      const root = model.getRoot();

      const section = model.createMap();
      section.set('type', 'text');
      section.set('order', root.get('sections').length);
      section.set('parent', parentId);
      section.set('content', model.createString());

      root.get('sections').push(section);
    },
    addImageSection: (file, parentId) => {
      fetch(`/drive/projects/assets/upload/${this.props.params.projectId}`, {
        credentials: 'same-origin',
        method: 'post',
        body: (function() {
          const data = new FormData();
          data.append('file', file, file.name);

          return data;
        }())
      })
      .then(resp => resp.json())
      .then(data => {
        const model = this.driveDocument.getModel();
        const root = model.getRoot();

        const section = model.createMap();
        section.set('type', 'annotatedImage');
        section.set('order', root.get('sections').length);
        section.set('parent', parentId);
        section.set('image', data);
        section.set('annotations', model.createList());

        root.get('sections').push(section);
      });
    },
    addAnnotation: (marker, description, sectionId) => {
      const model = this.driveDocument.getModel();
      const root = model.getRoot();

      root.get('sections').asArray()
        .filter(section => section.getId() === sectionId)
        .forEach(section => {
          const annotation = model.createMap();
          const content = model.createString();
          content.setText(description);

          annotation.set('position', Object.assign({}, {
            left: '0',
            top: '0',
            angle: '0'
          }, marker));
          annotation.set('content', content);
          annotation.set('order', section.get('annotations').length);
          section.get('annotations').push(annotation);
        });
    }
  };
}

export default DriveDocument;
