import React, { Component, PropTypes } from 'react';
import Marker from './Marker';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import Types from './DragAndDropTypes';


class AnnotatedImage extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    annotations: PropTypes.array.isRequired,
    underEdition: PropTypes.bool.isRequired,
    drive: PropTypes.object.isRequired,
    marker: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.connectDropTarget(
      <div style={({position: 'relative'})}
        onMouseDown={e => {
          if (this.props.underEdition) {
            this.placeMarker(e);
          }
        }} >
        <img src={this.props.image.webContentLink}
          style={({maxWidth: '100%'})} />
        {this.props.underEdition &&
          <Marker marker={this.props.marker} />}
        {this.props.annotations.map(annotation =>
          <Marker key={annotation.id}
            marker={({...annotation.position, id: annotation.id, label: annotation.label})} />
        )}
      </div>
    );
  }

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
}

export default DropTarget(Types.marker, {
  canDrop: (props, monitor) => props.annotations.some(annotation => annotation.id === monitor.getItem().id),
  drop: (props, monitor, component) => {
    const node = findDOMNode(component);
    const item = monitor.getItem();

    const { x, y } = monitor.getDifferenceFromInitialOffset();

    const width = node.offsetWidth;
    const height = node.offsetHeight;

    const left = (1 - (width - Math.abs(x)) / width) * 100 * (x / Math.abs(x)) + item.left;
    const top = (1 - (height - Math.abs(y)) / height) * 100 * (y / Math.abs(y)) + item.top;

    props.drive.updateMarker({
      id: item.id,
      left,
      top
    });
  }
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
})
)(AnnotatedImage);
