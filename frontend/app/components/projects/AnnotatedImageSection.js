import React, { Component, PropTypes } from 'react';
import Marker from '../presentational/util/Marker';
import Section from './Section';

export default class AnnotatedImageSection extends Component {
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
    const image = this.props.content.image;
    const underEdition = this.props.editing.some(sectionId => sectionId === this.props.content.id);
    let marker = (<span />);

    if (this.props.marker && underEdition) {
      marker = (<Marker marker={this.props.marker} />);
    }

    return (
      <div>
        <div>
          <div style={({position: 'relative'})}
            onMouseDown={e => {
              if (underEdition) {
                this.placeMarker(e);
              }
            }} >
            <img src={image.webContentLink}
              style={({maxWidth: '100%'})} />
            {underEdition ? marker : ''}
            {this.props.content.annotations.map(annotation =>
              <Marker key={annotation.id}
                marker={({...annotation.position, id: annotation.id})} />
            )}
          </div>
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

  placeMarker = (e) => {
    const x = e.pageX - e.target.getBoundingClientRect().left;
    const y = e.pageY - e.target.getBoundingClientRect().top - e.target.offsetParent.offsetParent.offsetParent.scrollTop;

    const width = e.target.width;
    const height = e.target.height;

    const left = (1 - (width - x) / width) * 100;
    const top = (1 - (height - y) / height) * 100;

    this.props.actions.placeMarker({
      left,
      top
    });
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
