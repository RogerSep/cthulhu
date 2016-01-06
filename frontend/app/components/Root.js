import React from 'react';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Hello world! {JSON.stringify(this.props.store.getState())}</div>
    );
  }
}
