import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './_markdown.scss';

export default class Section extends Component {

  static propTypes = {
    content: PropTypes.object,
    actions: PropTypes.object,
    drive: PropTypes.object,
    editing: PropTypes.bool,
    markdownProcessor: PropTypes.object
  };

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

    return (
      <div styleName='document-section'
        onClick={() => this.props.actions.editCollaborativeObject(this.props.content.id)}>
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

export default CSSModules(Section, styles);
