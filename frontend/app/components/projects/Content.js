import React, { PropTypes } from 'react';
import TableOfContents from './TableOfContents';
import ContentView from './ContentView';

export default class Content extends React.Component {
  static propTypes = {
    model: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TableOfContents content={this.computeTableOfContents()} />
        <ContentView content={this.computeContent()} />
        <pre>
          {JSON.stringify(this.props.model, null, 4)}
        </pre>
      </div>
    );
  }

  computeTableOfContents() {
    const model = this.props.model;

    if (!model) {
      return [];
    }

    return model.value.sections.value.map(section => {
      const title = (/^# (.+)$/m).exec(section.value.content.value) || ['unnamed'];
      return {
        id: section.id,
        title: title[0].replace('# ', ''),
        order: section.value.order.json
      };
    }).sort((a, b) => a.order - b.order);
  }

  computeContent() {
    const model = this.props.model;

    if (!model) {
      return [];
    }

    return model.value.sections.value.map(section => {
      return {
        id: section.id,
        content: section.value.content.value,
        order: section.value.order.json
      };
    }).sort((a, b) => a.order - b.order);
  }
}
