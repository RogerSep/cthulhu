import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import Types from './DragAndDropTypes';
import styles from './_marker.scss';
import CSSModules from 'react-css-modules';

class Marker extends Component {
  static propTypes = {
    marker: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    console.log(props.marker);
  }

  render() {
    const marker = this.props.marker;
    if (!marker) {
      return null;
    }

    const position = {
      position: 'absolute',
      left: `${marker.left}%`,
      top: `${marker.top}%`,
      transform: 'translateX(-50%)',
      color: 'white'
    };

    /*eslint-disable react/jsx-max-props-per-line */
    return this.props.connectDragSource(
      <div styleName="marker" style={position}>
        <svg width="33px" height="50px" viewBox="0 0 33 50" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" fill="none" fill-rule="evenodd">
            <g className="drop-marker">
              <path d="M16.2449811,49.9583359 C25.0520465,49.9583359 32.1915837,42.835714 32.1915837,34.0495146 C32.1915837,25.2633152 16.2449811,0 16.2449811,0 C16.2449811,0 0.298378491,25.2633152 0.298378491,34.0495146 C0.298378491,42.835714 7.43791566,49.9583359 16.2449811,49.9583359 Z" fill="#FFFFFF" />
              <path d="M16.3340336,48.6899878 C24.4242247,48.6899878 30.9826203,42.1471305 30.9826203,34.076107 C30.9826203,26.0050836 16.3340336,2.79814272 16.3340336,2.79814272 C16.3340336,2.79814272 1.68544691,26.0050836 1.68544691,34.076107 C1.68544691,42.1471305 8.24384257,48.6899878 16.3340336,48.6899878 Z" fill="#2196F3" />
            </g>
          </g>
        </svg>
        {this.props.marker.label}
      </div>
    );
    /*eslint-enable*/
  }
}

export default CSSModules(DragSource(
  Types.marker,
  {
    beginDrag: props => ({
      ...props.marker
    })
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource()
  })
)(Marker), styles);
