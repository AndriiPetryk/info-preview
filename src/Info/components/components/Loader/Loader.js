// @flow
import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Loader.module.scss';

const Loader = (): React.Node => (
  <div className={styles.loaderWrapper}>
    <CircularProgress style={{ color: '#1EADCA' }} />
  </div>
);

export default Loader;
