import React, { PropTypes } from 'react';
import remark from 'remark';
import reactRenderer from 'remark-react';
import Section from './Section';

export default class ContentView extends React.Component {
  static propTypes = {
    content: PropTypes.array,
    editing: PropTypes.array,
    actions: PropTypes.object.isRequired,
    bind: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.markdownProcessor = remark().use(reactRenderer);
  }

  render() {
    return (
      <div>
        {this.props.content.map(section => this.renderSection(section, this.props, this.markdownProcessor))}
      </div>
    );
  }

  renderSection = (section, props, markdownProcessor) => {
    return (
      <Section key={section.id}
        content={section}
        actions={props.actions}
        bind={props.bind}
        editing={props.editing.some(id => id === section.id)}
        markdownProcessor={this.markdownProcessor} />
    );
  };

}
