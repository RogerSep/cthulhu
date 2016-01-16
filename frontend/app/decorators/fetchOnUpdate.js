import React, { Component, PropTypes } from 'react';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';

function mapParams(paramKeys, params) {
  return paramKeys.reduce(({ ...acc }, key) => {
    return {
      ...acc,
      [key]: params[key]
    };
  }, {});
}

export default function fetchOnUpdate(paramKeys, fn) {
  return DecoratedComponent =>
    class FetchOnUpdateDecorator extends Component {
      static displayName = 'FetchOnUpdateDecorator';

      static propTypes = {
        actions: PropTypes.object,
        params: PropTypes.object
      };

      componentWillMount() {
        fn(mapParams(paramKeys, this.props.params), this.props.actions);
      }

      componentDidUpdate(previousProps) {
        const params = mapParams(paramKeys, this.props.params);
        const previousParams = mapParams(paramKeys, previousProps.params);

        if (!shallowEqual(params, previousParams)) {
          fn(params, this.props.actions);
        }
      }

      render() {
        return (
          <DecoratedComponent {...this.props} />
        );
      }
    };
}
