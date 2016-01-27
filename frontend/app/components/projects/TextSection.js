import React, { Component, PropTypes } from 'react';

export default class TextSection extends Component {
  static propTypes = {
    content: PropTypes.object,
    actions: PropTypes.object,
    drive: PropTypes.object,
    editing: PropTypes.array,
    markdownProcessor: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const underEdition = this.props.editing.some(id => id === this.props.content.id);

    let sectionRender;
    if (!underEdition) {
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
    const underEdition = this.props.editing.some(id => id === this.props.content.id);
    const willBeUnderEdition = nextProps.editing.some(id => id === nextProps.content.id);

    const editFlagToggled = (underEdition || willBeUnderEdition) && !(underEdition && willBeUnderEdition);
    const contentChangedWhileVisualizing = !underEdition && this.props.content.content !== nextProps.content.content;

    return editFlagToggled || contentChangedWhileVisualizing;
  }
}
