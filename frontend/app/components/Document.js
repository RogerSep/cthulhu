import React from 'react';

class Document extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <textarea ref={ref => this._dom = ref} defaultValue="ola k ase"/>
      </div>
    );
  }

  componentDidMount () {
    const realtime = new utils.RealtimeUtils({clientId: '531838806517-k0n3hkar23fjc3ea1vhbtecvnkot9vua.apps.googleusercontent.com'});
    realtime.authorize(() => {
      realtime.load(this.props.params.projectId, doc => {
        const model = doc.getModel();
        const root = model.getRoot();

        if (!root.get('example')) {
          const str = model.createString();
          root.set('example', str);
        }

        const str = root.get('example');

        console.log('values: ', {
          textarea: this._dom,
          str,
          model,
          root,
          doc
        });

        gapi.drive.realtime.databinding.bindString(str, this._dom);
      })
    });
  }
}

export default Document;
