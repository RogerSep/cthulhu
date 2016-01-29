/* eslint-disable react/no-unknown-property */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import css from './CollaborativeItem.scss';

class CollaborativeItem extends Component {
  static propTypes = {
    link: PropTypes.string,
    name: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link className={css.link}
        to={this.props.link}>
        <div className={css.projectIconContainer}>
          <svg width="44px"
            height="56px"
            viewBox="0 0 72 91"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <g className={css.projectIcon}
              stroke="none"
              stroke-width={1}
              fill="none"
              fill-rule="evenodd">
              <path
                className={css.projectIconBorder}
                d="M0,2.00253926 C0,0.896567366 0.890598871,0 2.00833922,0 L46.8974085,0 C48.0065836,0 49.5466901,0.62003083 50.3485201,1.39569998 L70.5272289,20.9160515 C71.32405,21.6868753 71.9700012,23.2028804 71.9700012,24.3062612 L71.9700012,88.815905 C71.9700012,89.9174423 71.0730618,90.8104147 69.969996,90.8104147 L2.00000523,90.8104147 C0.895432841,90.8104147 0,89.9116322 0,88.8078755 L0,2.00253926 Z"
                fill="#2196F3" />
              <path className={css.projectIconBackground}
                d="M3.21875,5.20439876 C3.21875,4.10391992 4.11435345,3.21180556 5.21770366,3.21180556 L46.0551631,3.21180556 C47.1591547,3.21180556 48.6869337,3.83557684 49.4743089,4.61169703 L67.7785612,22.6543023 C68.5629117,23.427441 69.1987534,24.9587428 69.1987534,26.0571047 L69.1987534,86.0388965 C69.1987534,87.1450736 68.3035813,88.0418074 67.2061272,88.0418074 L5.21137619,88.0418074 C4.11087913,88.0418074 3.21875,87.1465241 3.21875,86.0492142 L3.21875,5.20439876 Z"
                fill="#FFFFFF" />
              <g transform="translate(45.000000, 1.000000)">
                <path className={css.projectIconFoldBorder}
                  d="M0,1.19977837 C0,0.100585848 0.643764879,-0.182074189 1.45837944,0.587804585 L25.6670228,23.4669939 C26.4724635,24.2282026 26.2228915,24.8452842 25.1308066,24.8452842 L1.99459559,24.8452842 C0.893010864,24.8452842 0,23.9479252 0,22.8550201 L0,1.19977837 Z"
                  fill="#2196F3" />
                <path className={css.projectIconFoldBackground}
                  d="M2.95339913,4.51338409 C2.95339913,3.41052287 3.59905111,3.13215426 4.40513032,3.90081056 L21.2444131,19.9583156 C22.0461821,20.7228618 21.7965377,21.3426489 20.694457,21.3426489 L4.95508643,21.3426489 C3.84958506,21.3426489 2.95339913,20.4472886 2.95339913,19.345742 L2.95339913,4.51338409 Z"
                  fill="#FFFFFF" />
              </g>
            </g>
          </svg>
          <p className={css.projectName}>{this.props.name}</p>
        </div>
      </Link>
    );
  }
}

export default CollaborativeItem;
