import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './_markdown.scss';
import ImageSection from './ImageSection';
import TextSection from './TextSection';

export default class Section extends Component {

  static propTypes = {
    content: PropTypes.object,
    actions: PropTypes.object,
    drive: PropTypes.object,
    editing: PropTypes.array,
    markdownProcessor: PropTypes.object.isRequired,
    marker: PropTypes.object
  };

  render() {
    const sectionRender = (this.props.content.type === 'text' ?
      <TextSection { ...this.props } /> :
      <ImageSection { ...this.props } />
    );

    return (
      <div styleName='document-section'>
        <div styleName="control-panel">
          <i className="fa fa-pencil"
            onClick={this.toggleEdition}></i>
          <i className="fa fa-trash"
            onClick={() => this.delete(this.props.content.id)}></i>
        </div>
        {sectionRender}
      </div>
    );
  }

  toggleEdition = () => {
    if (this.props.editing.some(sectionId => sectionId === this.props.content.id)) {
      this.props.actions.finishEditCollaborativeObject(this.props.content.id);
    } else {
      this.props.actions.editCollaborativeObject(this.props.content.id);
    }
  };

  delete = objectId => this.props.drive.delete(objectId);
}

export default CSSModules(Section, styles);
