// @flow
import * as React from 'react';
import classNames from 'classnames';
import ClearAllOutlinedIcon from '@material-ui/icons/ClearAllOutlined';
import styles from './ClearFiltersButton.module.scss';
import { Context } from '../../Filters/context';

const ClearFiltersButton = (): React.Node => {
  const { wrapperProps }: any = React.useContext(Context);
  const { className: wrapperClassName, ...restWrapperProps } = wrapperProps;
  return (
    <div
      className={classNames([styles.wrapper], {
        [wrapperClassName]: !!wrapperClassName
      })}
      {...restWrapperProps}
    >
      <ClearAllOutlinedIcon />
    </div>
  );
};

export default ClearFiltersButton;
