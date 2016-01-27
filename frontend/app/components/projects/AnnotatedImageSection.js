import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

export default class AnnotatedImageSection extends Component {
  static propTypes = {
    content: PropTypes.object,
    actions: PropTypes.object,
    drive: PropTypes.object,
    editing: PropTypes.bool,
    markdownProcessor: PropTypes.object,
    marker: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const image = this.props.content.image;
    let marker = (<span />);

    if (this.props.marker) {
      marker = this.renderMarker(this.props.marker);
    }

    return (
      <div>
        <img src={image.webContentLink} />
        <Modal isOpen={this.props.editing}>
          <button onClick={() => this.props.actions.finishEditCollaborativeObject(this.props.content.id)}></button>
          <div>
            <div style={({position: 'relative', display: 'inline-block'})}>
              <img src={image.webContentLink}
                onMouseDown={this.placeMarker} />
              {marker}
              {this.props.content.annotations.map(annotation => this.renderMarker({...annotation.position, id: annotation.id}))}
            </div>
            <textarea
              onBlur={this.createMarker}
              ref="textarea" />
          </div>
        </Modal>
      </div>
    );
  }

  renderMarker(marker) {
    const style = {
      fill:'rgb(0,0,255)',
      'strokeWidth':3,
      stroke:'rgb(0,0,0)'
    };

    const position = {
      position: 'absolute',
      left: `${marker.left}%`,
      top: `${marker.top}%`
    };

    return (
      <svg key={marker.id || 'empty'}
        width="5"
        height="5"
        style={position}>
        <rect width="5"
          height="5"
          style={style} />
      </svg>
    );
  }

  placeMarker = (e) => {
    const x = e.pageX - e.target.offsetLeft - e.target.offsetParent.offsetLeft - e.target.offsetParent.offsetParent.offsetLeft;
    const y = e.pageY - e.target.offsetTop - e.target.offsetParent.offsetTop - e.target.offsetParent.offsetParent.offsetTop;

    const width = e.target.width;
    const height = e.target.height;

    const left = (1 - (width - x) / width) * 100;
    const top = (1 - (height - y) / height) * 100;

    this.props.actions.placeMarker({
      left,
      top
    });

    this.refs.textarea.focus();
  };

  createMarker = () => {
    if ((this.refs.textarea.value || '').trim().length) {
      this.props.drive.addAnnotation(
        this.props.marker,
        this.refs.textarea.value,
        this.props.content.id
      );
      this.refs.textarea.value = '';
    }
  };
}
