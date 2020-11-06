import { size, uniq, flatten } from 'lodash';
import { bucketsPriceToIdMapping } from '../../../enums/buckets';

// Todo: consider to move it to the shared components library

export const getBucketInfo = (
  bucketListData,
  programId,
  bucketId,
  rewardType = 'experience'
) => {
  const bucketKey = `program_${programId}/${rewardType}/bucket_${bucketId}`;
  return bucketListData[bucketKey];
};

export const getBucketsByProgram = (
  bucketListData,
  programId,
  rewardType = 'experience'
) => {
  if (!size(bucketListData) || !programId) return [];
  return Object.keys(bucketListData).reduce(
    (res, key) =>
      key.match(`program_${programId}/${rewardType}/`)
        ? [...res, bucketListData[key]]
        : res,
    []
  );
};

export const getAvailableBucketsIdsInAllPrograms = (
  bucketList,
  programList,
  rewardType = 'experience'
) => {
  if (!size(bucketList) || !size(programList)) return [];
  const availableBucketsIds = [];
  programList.forEach(({ id: programId }) => {
    availableBucketsIds.push(
      getBucketsByProgram(bucketList, programId, rewardType)
        .filter((bucket) => !bucket.is_disabled)
        .map((bucket) => bucket.bucket_id)
    );
  });
  return uniq(flatten(availableBucketsIds));
};

export const getAvailableBucketIdByPricePriority = (
  bucketList,
  pricePriority
) => {
  let bucketId;
  pricePriority.some((price) => {
    const bucketIdByPrice = bucketsPriceToIdMapping[price];
    if (bucketList.includes(bucketIdByPrice)) {
      bucketId = bucketIdByPrice;
      return true;
    }
    return false;
  });
  return bucketId;
};
