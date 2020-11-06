// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button';
import { INFO_DEFAULT_PARAMS } from '../../constants';
import styles from './InfoContent.module.scss';

const HasError = ({ onParamsChange }: Function): React.Node => {
  return (
    <div className={styles.hasErrorContentBlock}>
      <h1>OOPS!</h1>
      <h2>Something went wrong!</h2>
      <Button
        key="try-more"
        variant="contained"
        onClick={() => {
          onParamsChange(INFO_DEFAULT_PARAMS, true);
        }}
      >
        Try again
      </Button>
    </div>
  );
};

export default HasError;
