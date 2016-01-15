import React, { PropTypes } from 'react';

import remark from 'remark';
import reactRenderer from 'remark-react';

export default class ContentView extends React.Component {
  static propTypes = {
    content: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.markdownProcessor = remark().use(reactRenderer);
  }

  render() {
    return (
      <div>
        {this.props.content.map(section => {
          return (
            <div key={section.id}>
              {this.markdownProcessor.process(section.content)}
            </div>
          );
        })}
      </div>
    );
  }

}
