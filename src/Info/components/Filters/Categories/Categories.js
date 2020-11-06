// @flow
import * as React from 'react';
import Select from '../../components/Select/Select';
import styles from './Categories.module.scss';
import { Context } from '../context';

type Props = {
  onChange: Function,
  infoCategoriesList: [],
  selectedCategoriesOptions: Array<{
    id: number,
    name: string,
  }>,
};

const CategoriesFilter = (): React.Node => {
  const {
    onChange,
    infoCategoriesList,
    selectedCategoriesOptions,
  }: Props = React.useContext(Context);

  if (!infoCategoriesList || infoCategoriesList.length === 0) {
    return null;
  }

  const selectedCategoriesIds =
    selectedCategoriesOptions.length > 0 ? selectedCategoriesOptions[0].id : 1;

  return (
    <div className={styles.selectFilter}>
      <Select
        entityList={infoCategoriesList}
        selectedEntityId={selectedCategoriesIds}
        onChange={onChange}
        entityType="category"
      />
    </div>
  );
};

export default CategoriesFilter;
