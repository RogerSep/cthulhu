import React, { Component, PropTypes } from 'react';
import Marker from '../presentational/util/Marker';
import Section from './Section';
import AnnotatedImage from '../presentational/util/AnnotatedImage';

export default class ImageSection extends Component {
  static propTypes = {
    content: PropTypes.object,
    actions: PropTypes.object,
    drive: PropTypes.object,
    editing: PropTypes.array,
    markdownProcessor: PropTypes.object,
    marker: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const underEdition = this.props.editing.some(sectionId => sectionId === this.props.content.id);

    return (
      <div>
        <div>
          <AnnotatedImage
            image={this.props.content.image}
            actions={this.props.actions}
            drive={this.props.drive}
            annotations={this.props.content.annotations}
            underEdition={underEdition}
            marker={this.props.marker}
            />
          <div style={({display: underEdition ? 'block' : 'none'})}>
            <textarea placeholder="Mark a point in the image and put its description here."
              onBlur={this.createMarker}
              ref="textarea" />
          </div>
        </div>
        <ul>
          {this.props.content.annotations.map(annotation => this.renderAnnotation(annotation))}
        </ul>
      </div>
    );
  }

  renderAnnotation = annotation => {
    return (
      <li key={annotation.id}>
        {annotation.label}
        <Section
          content={({
            id: annotation.description.id,
            content: annotation.description.value,
            type: 'text'
          })}
          actions={this.props.actions}
          drive={this.props.drive}
          editing={this.props.editing}
          markdownProcessor={this.props.markdownProcessor} />
      </li>
    );
  };

  createMarker = () => {
    if ((this.refs.textarea.value || '').trim().length
      && this.props.marker
      && this.props.marker.top
      && this.props.marker.left
    ) {
      this.props.drive.addAnnotation(
        this.props.marker,
        this.refs.textarea.value,
        this.props.content.id
      );
      this.refs.textarea.value = '';
      this.props.actions.placeMarker(undefined);
    }
  };
}
