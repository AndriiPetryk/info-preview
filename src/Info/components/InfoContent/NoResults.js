// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button';
import noResultsImg from '../../assets/img/no_results_empty.png';
import { INFO_DEFAULT_PARAMS } from '../../constants';
import styles from './InfoContent.module.scss';

const NoResults = ({ onParamsChange }: Function): React.Node => {
  return (
    <div className={styles.hasErrorContentBlock}>
      <img
        src={noResultsImg}
        className={styles.noResultImage}
        alt="noResultsImg"
      />
      <h1>No results found</h1>
      <h2>Try clearing your search filters or changing your keywords</h2>
      <Button
        variant="contained"
        key="clear"
        onClick={() => {
          onParamsChange(INFO_DEFAULT_PARAMS, true);
        }}
      >
        Clear filters
      </Button>
    </div>
  );
};

export default NoResults;
