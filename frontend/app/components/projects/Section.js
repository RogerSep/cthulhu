import React, { Component, PropTypes } from 'react';
import css from './_markdown.scss';

export default class Section extends Component {

  static propTypes = {
    content: PropTypes.object,
    actions: PropTypes.object,
    bind: PropTypes.func,
    editing: PropTypes.bool,
    markdownProcessor: PropTypes.object
  };


  render() {
    let sectionRender;
    if (!this.props.editing && this.props.content.content.length >= 0) {
      sectionRender = (
        <div
          onClick={() => this.props.actions.editCollaborativeObject(this.props.content.id)}>
          {this.props.markdownProcessor.process(this.props.content.content)}
        </div>
      );
    } else {
      let binding;
      sectionRender = (
        <textarea autoFocus={true} defaultValue={this.props.content.content}
          onBlur={() => {
            this.props.actions.finishEditCollaborativeObject(this.props.content.id);
            if (binding) {
              binding.unbind();
            }
          }}
          ref={ref => {
            binding = this.props.bind(this.props.content.id, ref);
          }}/>
      );
    }

    return (
      <div className={css.markdownContainer}>
        {sectionRender}
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    const editFlagToggled = (this.props.editing || nextProps.editing) && !(this.props.editing && nextProps.editing);
    const contentChanged = !this.props.editing && this.props.content.content !== nextProps.content.content;

    return editFlagToggled || contentChanged;
  }

}
