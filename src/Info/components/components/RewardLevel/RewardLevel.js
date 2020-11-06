import React from 'react';
import PropTypes from 'prop-types';
import RewardLevel from '../ReawardLevel/RewardLevel';
import styles from './RewardLevel.module.scss';

const RewardLevelCommon = ({ classes, tooltip, ...props }) => (
  <RewardLevel {...props} classes={{ ...styles, ...classes }} />
);

RewardLevelCommon.propTypes = {
  classes: PropTypes.shape({
    experienceHolder: PropTypes.string,
    experienceVisual: PropTypes.string,
    rewardTitle: PropTypes.string,
  }),
  tooltip: PropTypes.bool,
  bucket: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    icon: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  showPrice: PropTypes.bool,
};

RewardLevelCommon.defaultProps = {
  classes: {},
  tooltip: false,
  showPrice: false,
};

export default RewardLevelCommon;
