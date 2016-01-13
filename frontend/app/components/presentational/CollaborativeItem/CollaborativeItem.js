import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import css from './CollaborativeItem.scss';

class CollaborativeItem extends React.Component {
  static propTypes = {
    link: PropTypes.string,
    name: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={this.props.link}>
        <div className={css.gridItem}>
          {this.props.name}
        </div>
      </Link>
    );
  }
}

export default CollaborativeItem;
