// @flow
import * as React from 'react';
import classNames from 'classnames';
import _camelCase from 'lodash/camelCase';
import styles from './InfoLabel.module.scss';

type Props = {
  category: string,
  className?: string,
};

const InfoLabel = ({ category, className }: Props): React.Node => (
  <div
    className={classNames(styles.root, styles[_camelCase(category)], className)}
  >
    {category}
  </div>
);

InfoLabel.defaultProps = {
  className: undefined,
};

export default InfoLabel;
