import React, { PropTypes } from 'react';

export default class TableOfContents extends React.Component {
  static propTypes = {
    content: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.content.map(section => {
            return (
              <li key={section.id}>{section.title}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}
