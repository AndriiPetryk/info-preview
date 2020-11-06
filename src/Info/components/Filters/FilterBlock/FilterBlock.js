// @flow
import * as React from 'react';
import { Context } from '../context';
import { getBucketOptions } from '../../../utils/bucket';
import ClearFiltersButton from '../../components/ClearFiltersButton/ClearFiltersButton';
import Location from '../Location/Location';
import RewardsLevel from '../RewardsLevel/RewardsLevel';
import CategoriesFilter from '../Categories/Categories';
import WishList from '../WishList/WishList';
import styles from './FilterBlock.module.scss';
import {
  INFO_BUCKET_ID,
  INFO_CATEGORY_ID,
  INFO_DEFAULT_PARAMS,
  INFO_LOCATION_ID,
  INFO_PAGE_QUERY,
} from '../../../constants';

import type { FilterProps as Props } from '../../../constants';
import {
  getExperiencesLocations,
  getLocationIdForFilter,
  getSelectedCategoriesOptions,
} from '../../../utils';

const FilterBlock = ({
  wishlistTotalCount,
  infoCategoriesList,
  urlParams,
  programList,
  onParamsChange,
  locationsData,
  bucketsList,
  fetchInfoCategories,
}: Props): React.Node => {
  React.useEffect(() => {
    fetchInfoCategories(urlParams);
  }, []);

  const locationsList = React.useMemo(
    () => getExperiencesLocations(locationsData),
    [locationsData]
  );

  const onFilterChange = (filteredEntity, filterType) => {
    const paramsChange = {
      [INFO_PAGE_QUERY]: 1,
    };
    if (filterType === 'category') {
      const { value: categoryId } = filteredEntity;
      paramsChange[INFO_CATEGORY_ID] = categoryId;
    }
    if (filterType === 'bucket') {
      const { value: bucket_id } = filteredEntity;
      paramsChange[INFO_BUCKET_ID] = bucket_id;
    }
    if (filterType === 'location') {
      const { value: locationId } = filteredEntity;
      paramsChange[INFO_LOCATION_ID] = locationId;
    }
    onParamsChange(paramsChange);
  };

  const {
    [INFO_CATEGORY_ID]: categoryIds,
    [INFO_BUCKET_ID]: bucketId,
    [INFO_LOCATION_ID]: locationId,
  } = urlParams;

  const selectedCategoriesOptions = categoryIds
    ? getSelectedCategoriesOptions(infoCategoriesList, categoryIds)
    : [];

  const bucketOptions = getBucketOptions(bucketsList, programList);

  const selectedBucketOptions = bucketId
    ? bucketOptions.filter((bucket) => bucketId.includes(bucket.value))
    : [];

  const selectedLocationOptions = locationId
    ? getLocationIdForFilter(locationsList, locationId)
    : [];

  return (
    <Context.Provider
      value={{
        onChange: onFilterChange,
        locationsList,
        selectedLocationOptions,
        bucketsList: bucketOptions,
        selectedBucketOptions,
        onParamsChange,
        selectedCategoriesOptions,
        infoCategoriesList,
        wrapperProps: {
          onClick: () => onParamsChange(INFO_DEFAULT_PARAMS, true),
        },
        wishlistTotalCount,
      }}
    >
      <div className={styles.filterBlockWrap}>
        <div className={styles.filtersWrap}>
          <Location />
          <RewardsLevel />
          <CategoriesFilter />
          <ClearFiltersButton />
        </div>
        <WishList />
      </div>
    </Context.Provider>
  );
};

FilterBlock.defaultProps = {
  wishlistTotalCount: null,
};

export default FilterBlock;
