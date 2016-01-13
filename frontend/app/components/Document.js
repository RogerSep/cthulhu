import React, { PropTypes } from 'react';
import Realtime from '../drive/Realtime';

class Document extends React.Component {

  static propTypes = {
    params: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <textarea/>
      </div>
    );
  }

  componentDidMount() {
    Realtime.authorize(() => {
      Realtime.load(this.props.params.projectId, doc => {
        const model = doc.getModel();
        const root = model.getRoot();

        console.log(`Document: ${this.props.params.projectId}`, doc, model, root);

        this.setState({
          doc, model, root
        });
      });
    });
  }

  componentWillUnmount() {
    if (this.state.doc) {
      this.state.doc.close();
    }
  }
}

export default Document;
