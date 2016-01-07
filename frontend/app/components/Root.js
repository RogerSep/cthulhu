import React from 'react';
import css from '../main.scss';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ css.example }>Hello world! {JSON.stringify(this.props.store.getState())}</div>
    );
  }
}
