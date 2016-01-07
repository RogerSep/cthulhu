import React from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import css from '../main.scss';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className={ css.example }>
        Hello world!
        {this.props.children}
        <div>
          <button onClick={() => dispatch(pushPath('/'))}>Go to Home!</button>
          <button onClick={() => dispatch(pushPath('/bla'))}>Go to Bla!</button>
        </div>
      </div>
    );
  }
}

function selectProps({ projects }) {
  return {
    projects
  };
}

export default connect(selectProps)(Root);
