// @flow
import * as React from 'react';
import classNames from 'classnames';
import styles from './Details.module.scss';

type Props = {
  subDescription: React.Node,
  className: string,
};

/* eslint-disable react/no-danger */
const Details = ({ subDescription, className }: Props): React.Node => (
  <>
    <span className={styles.title}>Details</span>
    <div
      className={classNames(styles.holder, {
        [className]: !!className,
      })}
      dangerouslySetInnerHTML={{ __html: subDescription }}
    />
  </>
);

export default Details;
