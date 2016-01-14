import React, { PropTypes } from 'react';

export default class ContentView extends React.Component {
  static propTypes = {
    content: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.content.map(section => {
          return (
            <pre>
              {JSON.stringify(section)}
            </pre>
          );
        })}
      </div>
    );
  }

}
