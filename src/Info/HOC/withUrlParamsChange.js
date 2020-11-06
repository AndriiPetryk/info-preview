import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import qs from 'qs';
import _omit from 'lodash/omit';
import { getReactComponentDisplayName, parsedUrlSelector } from '../utils';

const withUrlParamsChange = (WrappedComponent) => {
  class withUrlParamsChangeHOC extends PureComponent {
    onParamsChange = (data, shouldErasePrevParams = false) => {
      const { location } = this.props;
      const params = parsedUrlSelector(location);
      const newParams = shouldErasePrevParams ? data : { ...params, ...data };
      this.redirect(newParams);
    };

    onParamsRemove = (keys) => {
      const { location } = this.props;
      const params = parsedUrlSelector(location);
      const newParams = _omit(params, keys);
      this.redirect(newParams, true, keys);
    };

    redirect(params, force = false) {
      const {
        history,
        location: { pathname },
      } = this.props;
      const newSearch = qs.stringify(params, { addQueryPrefix: true });
      const path = `${pathname}${newSearch}`;
      if (force) {
        history.replace(path);
      } else {
        history.push(path);
      }
    }

    render() {
      const { location } = this.props;
      withUrlParamsChangeHOC.displayName = `withUrlParamsChangeHOC(${getReactComponentDisplayName(
        WrappedComponent
      )})`;
      const urlParams = parsedUrlSelector(location);
      return (
        <WrappedComponent
          {...this.props}
          urlParams={urlParams}
          onParamsChange={this.onParamsChange}
          onParamsRemove={this.onParamsRemove}
        />
      );
    }
  }

  withUrlParamsChangeHOC.propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
      isExact: PropTypes.bool,
      params: PropTypes.shape(),
      path: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func, replace: PropTypes.func })
      .isRequired,
  };

  return withUrlParamsChangeHOC;
};

export default (Comp) => withRouter(withUrlParamsChange(Comp));
