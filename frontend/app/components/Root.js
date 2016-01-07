import React from 'react';
import { connect } from 'react-redux';
import css from '../main.scss';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ css.example }>Hello world! {JSON.stringify(this.props)}</div>
    );
  }
}

function selectProps(state) {
  return state;
}

export default connect(selectProps)(Root);
