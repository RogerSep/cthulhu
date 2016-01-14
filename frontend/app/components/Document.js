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
        <Content content={JSON.stringify(this.props.projects.model, undefined, 4)} />
        <textarea ref={ref => this._dom = ref} />
      </div>
    );
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }

  onNext(document) {
    const model = document.getModel();
    const root = model.getRoot();

    if (!root.get('example')) {
      const str = model.createString();
      root.set('example', str);
    }

    const str = root.get('example');
    this.setState({});

    gapi.drive.realtime.databinding.bindString(str, this._dom);
    this.props.actions.updateModel(JSON.parse(document.getModel().toJson()));

    console.log('document', document);

    this.onNext = (document, e) => {
      console.log(e);
      this.props.actions.updateModel(JSON.parse(document.getModel().toJson()));
    }
  }

  onError(error) {
    this.props.actions.error(error);
  }
}

export default Document;
