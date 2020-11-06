// @flow
import * as React from 'react';
import Select from '../../components/Select/Select';
import { Context } from '../context';
import styles from './Location.module.scss';

type Props = {
  onChange: Function,
  locationsList: [],
  selectedLocationOptions: Array<{
    id: number,
    name: string,
  }>,
};

const Location = (): React.Node => {
  const {
    onChange,
    locationsList,
    selectedLocationOptions,
  }: Props = React.useContext(Context);

  if (!locationsList || locationsList.length === 0) {
    return null;
  }

  const selectedLocationId =
    selectedLocationOptions.length > 0 ? selectedLocationOptions[0].id : 1;

  return (
    <div className={styles.selectFilter}>
      <Select
        selectedEntityId={selectedLocationId}
        entityList={locationsList}
        onChange={onChange}
        entityType="location"
      />
    </div>
  );
};

export default Location;
