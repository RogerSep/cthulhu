import React, { Component, PropTypes } from 'react';

export default class AnnotatedImageSection extends Component {
  static propTypes = {
    content: PropTypes.object,
    actions: PropTypes.object,
    drive: PropTypes.object,
    editing: PropTypes.bool,
    markdownProcessor: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const image = this.props.content.image;
    return (
      <div>
        <img src={image.webContentLink} />
      </div>
    );
  }
}
