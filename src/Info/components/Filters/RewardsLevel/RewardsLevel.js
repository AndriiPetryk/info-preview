// @flow
import * as React from 'react';
import Select from '../../components/Select/Select';
import styles from './RewardsLevel.module.scss';
import { Context } from '../context';

type Props = {
  onChange: Function,
  bucketsList: [],
  selectedBucketOptions: Array<{
    value: number,
    label: string,
  }>,
};

const RewardsLevel = (): React.Node => {
  const {
    onChange,
    bucketsList,
    selectedBucketOptions,
  }: Props = React.useContext(Context);

  if (!bucketsList || bucketsList.length === 0) {
    return null;
  }

  const selectedBucketId =
    selectedBucketOptions.length > 0 ? selectedBucketOptions[0].value : 1;

  return (
    <div className={styles.selectFilter}>
      <Select
        selectedEntityId={selectedBucketId}
        entityList={bucketsList}
        onChange={onChange}
        entityType="bucket"
      />
    </div>
  );
};

export default RewardsLevel;
