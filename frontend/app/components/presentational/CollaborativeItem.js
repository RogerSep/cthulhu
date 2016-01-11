import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import css from './collaborative-item.scss';

class CollaborativeItem extends React.Component {
  static propTypes = {
    link: PropTypes.string,
    name: PropTypes.string
  };

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Link to={this.props.link}>
        <div className={css.gridItem}>
          {this.props.name}
        </div>
      </Link>
    )
  }
}

class CollaborativeItemCreator extends React.Component {
  static propTypes = {
    create: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <input
        onKeyPress={this.create} />
    );
  }

  create = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      this.props.create(e.target.value);
    }
  };
}

export default CollaborativeItem;
export { CollaborativeItemCreator };
