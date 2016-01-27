import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './_markdown.scss';
import AnnotatedImageSection from './AnnotatedImageSection';
import TextSection from './TextSection';

export default class Section extends Component {

  static propTypes = {
    content: PropTypes.object,
    actions: PropTypes.object,
    drive: PropTypes.object,
    editing: PropTypes.bool,
    markdownProcessor: PropTypes.object,
    marker: PropTypes.object
  };

  render() {
    const sectionRender = (this.props.content.type === 'text' ?
      <TextSection { ...this.props } /> :
      <AnnotatedImageSection { ...this.props } />
    );

    return (
      <div styleName='document-section'>
        <div styleName="control-panel">
          <i className="fa fa-pencil"
            onClick={() => this.props.actions.editCollaborativeObject(this.props.content.id)}></i>
          <i className="fa fa-trash"></i>
        </div>
        {sectionRender}
      </div>
    );
  }

}

export default CSSModules(Section, styles);
