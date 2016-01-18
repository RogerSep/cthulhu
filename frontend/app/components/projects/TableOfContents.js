import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './_content.scss';

export default class TableOfContents extends Component {
  static propTypes = {
    content: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-4 col-md-3">
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

export default CSSModules(TableOfContents, styles);
