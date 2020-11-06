import React from 'react';
import NumberFormat from 'react-number-format';
import {
  head,
  chain,
  isEmpty,
  find,
  isEqual,
  pick,
  forEach,
  uniq,
} from 'lodash';
import Big from 'big.js';
import RewardLevel from '../components/components/RewardLevel/RewardLevel';

const currencyFormat = (value, decimalPlaces = 0) => {
  try {
    return Big(value).toFixed(decimalPlaces);
  } catch (e) {
    return '';
  }
};

export const hasProgramWithHiddenValue = (programs) =>
  programs.some((program) => program.hide_dollar_value_of_rewards);

export const getBucketOptions = (bucketList, programs) => {
  if (isEmpty(bucketList) || isEmpty(programs)) return [];

  const customizedBucketList = Object.keys(bucketList)
    .filter((key) => key.match(/experience/))
    .filter((key) => {
      const programIdMatch = key.match(/program_(\d+)\/experience/);
      const programId = programIdMatch ? +programIdMatch[1] : null;
      const bucket = bucketList[key];
      const { is_disabled: isDisabled } = bucket;
      return !isDisabled && programId && !!find(programs, { id: +programId });
    })
    .map((key) =>
      pick(bucketList[key], [
        'bucket_id',
        'name',
        'price',
        'icon.url',
        'svg_icon_url',
        'is_icon_customized',
      ])
    );

  const hideDollarValueOfRewards = hasProgramWithHiddenValue(programs);
  let allLevelsAreSame = true;
  const levels = chain(customizedBucketList).groupBy('bucket_id').value();

  forEach(levels, (group) => {
    const allBucketsAreSame = group.every((bucket) =>
      isEqual(bucket, head(group))
    );
    if (!allBucketsAreSame) {
      allLevelsAreSame = false;
    }
  });

  return chain(levels)
    .map((level) => {
      const bucket = head(level);
      return {
        value: bucket.bucket_id,
        label: allLevelsAreSame ? (
          <RewardLevel
            bucket={bucket}
            showPrice={!hideDollarValueOfRewards}
            tooltip
          />
        ) : (
          <div>
            {!hideDollarValueOfRewards && (
              <>
                <NumberFormat
                  value={currencyFormat(bucket.price)}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                />
                <span> - </span>
              </>
            )}
            {uniq(level.map(({ name }) => name)).join(' / ')}
          </div>
        ),
        price: bucket.price,
      };
    })
    .sort((prev, next) => +prev.price - +next.price)
    .value();
};
