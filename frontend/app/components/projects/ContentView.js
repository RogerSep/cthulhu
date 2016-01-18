import React, { Component, PropTypes } from 'react';
import remark from 'remark';
import reactRenderer from 'remark-react';
import Section from './Section';
import css from './_content.scss';

export default class ContentView extends Component {
  static propTypes = {
    content: PropTypes.array,
    editing: PropTypes.array,
    actions: PropTypes.object.isRequired,
    drive: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.markdownProcessor = remark().use(reactRenderer);
  }

  render() {
    return (
      <div className={css.sections}>
        {this.props.content.map(section => this.renderSection(section, this.props, this.markdownProcessor))}
        <button onClick={() => this.props.drive.addSection()}>Add section</button>
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
