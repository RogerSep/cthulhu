import React, { Component, PropTypes } from 'react';

export default class TextSection extends Component {
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
    let sectionRender;
    if (!this.props.editing) {
      sectionRender = (
        <div>
          {this.props.markdownProcessor.process(this.props.content.content || '*Click to add content*')}
        </div>
      );
    } else {
      let binding;
      sectionRender = (
        <textarea styleName='edit-box'
          autoFocus={true}
          defaultValue={this.props.content.content}
          onBlur={() => {
            this.props.actions.finishEditCollaborativeObject(this.props.content.id);
            if (binding) {
              binding.unbind();
            }
          }}
          ref={ref => {
            binding = this.props.drive.bindString(this.props.content.id, ref);
          }} />
      );
    }

    return sectionRender;
  }

  shouldComponentUpdate(nextProps) {
    const editFlagToggled = (this.props.editing || nextProps.editing) && !(this.props.editing && nextProps.editing);
    const contentChangedWhileVisualizing = !this.props.editing && this.props.content.content !== nextProps.content.content;

    return editFlagToggled || contentChangedWhileVisualizing;
  }
}
