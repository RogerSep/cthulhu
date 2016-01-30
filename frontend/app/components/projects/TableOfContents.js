import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './_content.scss';
import { Link } from 'react-router';

export default class TableOfContents extends Component {
  static propTypes = {
    drive: PropTypes.object,
    content: PropTypes.array,
    path: PropTypes.object
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
              <li key={section.id}>
                <Link to={`${this.props.path.project}/${section.id}`}>{section.title}</Link>
                <ul>
                  {section.subsections.map(subsection => (
                    <li key={subsection.id}><Link to={`${this.props.path.project}/${section.id}/${subsection.id}`}>{subsection.title}</Link></li>
                  ))}
                </ul>
              </li>
            );
          })}
          <li><button onClick={() => this.props.drive.addSection()}>Add section</button></li>
        </ul>
      </div>
    );
  }
}

export default CSSModules(TableOfContents, styles);
