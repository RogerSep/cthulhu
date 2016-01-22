import React, { Component, PropTypes } from 'react';
import remark from 'remark';
import reactRenderer from 'remark-react';
import Section from './Section';
import CSSModules from 'react-css-modules';
import styles from './_content.scss';

export default class ContentView extends Component {
  static propTypes = {
    content: PropTypes.object,
    subsections: PropTypes.array,
    editing: PropTypes.array,
    actions: PropTypes.object.isRequired,
    drive: PropTypes.object,
    path: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.markdownProcessor = remark().use(reactRenderer);
  }

  render() {
    return (
      <div className="col-sm-8 col-md-9">
        <div styleName="sections">
          {this.renderSection(this.props.content, this.props, this.markdownProcessor)}
          {this.props.subsections.map(section => this.renderSection(section, this.props, this.markdownProcessor))}
          <button onClick={() => this.props.drive.addSection(this.props.content.id)}>Add text section</button>
        </div>
      </div>
    );
  }

  renderSection = (section, props, markdownProcessor) => {
    return (
      <Section key={section.id}
        content={section}
        actions={props.actions}
        drive={props.drive}
        editing={props.editing.some(id => id === section.id)}
        markdownProcessor={markdownProcessor} />
    );
  };

}

export default CSSModules(ContentView, styles);
