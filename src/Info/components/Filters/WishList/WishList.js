// @flow
import * as React from 'react';
import classNames from 'classnames';
import WishlistIcon from '../../components/WishlistIcon/WishlistIcon';
import styles from './WishList.module.scss';
import { Context } from '../context';

type Props = {
  wishlistTotalCount: void,
  EMPLOYEE_DOMAIN: string,
};

const WishList = (): React.Node => {
  const { wishlistTotalCount }: Props = React.useContext(Context);

  return (
    <div className={styles.wishListCounter}>
      <WishlistIcon
        wishListTotal={wishlistTotalCount}
        className={classNames([styles.holder, styles.withoutTotal])}
        filled
      />
    </div>
  );
};

export default WishList;
