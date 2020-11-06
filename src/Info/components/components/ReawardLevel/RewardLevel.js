import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import NumberFormat from 'react-number-format';
import Big from 'big.js';
import defaultStyles from './Default.module.scss';

const currencyFormat = (value, decimalPlaces = 0) => {
  try {
    return Big(value).toFixed(decimalPlaces);
  } catch (e) {
    return '';
  }
};

const selectStyles = (classes, defaultSelectedStyles) => {
  return classes && Object.keys(classes).length
    ? classes
    : defaultSelectedStyles;
};

const RewardLevel = ({ bucket, showPrice, placeholder, classes }) => {
  if (_isEmpty(bucket)) return placeholder;

  let iconUrl = null;
  const { icon, name, is_icon_customized, svg_icon_url, price } = bucket;
  if (is_icon_customized) {
    iconUrl = icon ? icon.url : null;
  } else {
    iconUrl = svg_icon_url;
  }

  const styles = selectStyles(classes, defaultStyles);

  return (
    <div className={styles.experienceHolder}>
      <img className={styles.experienceVisual} src={iconUrl} alt={name} />
      <span className={styles.rewardTitle}>
        {name}
        {showPrice && (
          <>
            <NumberFormat
              value={currencyFormat(price)}
              displayType="text"
              thousandSeparator
              prefix=" ($"
              suffix=")"
            />
          </>
        )}
      </span>
    </div>
  );
};

RewardLevel.propTypes = {
  bucket: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    icon: PropTypes.shape({
      url: PropTypes.string,
    }),
    is_icon_customized: PropTypes.bool,
    svg_icon_url: PropTypes.string,
  }),
  showPrice: PropTypes.bool,
  placeholder: PropTypes.string,
  classes: PropTypes.shape({
    experienceHolder: PropTypes.string,
    experienceVisual: PropTypes.string,
    rewardTitle: PropTypes.string,
  }),
};

RewardLevel.defaultProps = {
  bucket: undefined,
  showPrice: false,
  placeholder: '',
  classes: undefined,
};

export default RewardLevel;
