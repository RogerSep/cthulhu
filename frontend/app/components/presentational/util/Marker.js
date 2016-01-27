import React, { Component, PropTypes } from 'react';

export default class Marker extends Component {
  static propTypes = {
    marker: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const marker = this.props.marker;
    const position = {
      position: 'absolute',
      left: `${marker.left}%`,
      top: `${marker.top}%`
    };

    const style = {
      fill: 'rgb(0,0,255)',
      strokeWidth: 3,
      stroke: 'rgb(0,0,0)'
    };

    return (
      <svg
        width="5"
        height="5"
        style={position}>
        <rect width="5"
          height="5"
          style={style} />
      </svg>
    );
  }
}
