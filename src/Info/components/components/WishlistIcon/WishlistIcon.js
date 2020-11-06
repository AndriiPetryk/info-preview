// @flow
import * as React from 'react';
import classNames from 'classnames';
import _noop from 'lodash/noop';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styles from './WishlistIcon.module.scss';

type Props = {
  wishListTotal?: Function,
  filled?: boolean,
  className: any,
  onClick?: Function,
};

const WishlistIcon = ({
  wishListTotal,
  filled,
  className,
  onClick,
  ...rest
}: Props): React.Node => {
  return (
    <div
      className={classNames(styles.holder, {
        [className]: !!className,
      })}
      onClick={onClick}
      {...(rest: any)}
    >
      <FavoriteIcon
        fontSize="large"
        className={classNames(styles.wishListIconDefault, {
          [styles.wishListIconFilled]: filled,
        })}
      />
      {wishListTotal && <span className={styles.total}>{wishListTotal}</span>}
    </div>
  );
};

WishlistIcon.defaultProps = {
  filled: false,
  wishListTotal: undefined,
  onClick: _noop,
};

export default WishlistIcon;
